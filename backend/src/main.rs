mod model;
mod redis;
mod error_manager;
mod auth;
mod config;
mod sanitizer;
use actix_cors::Cors;
use std::process::exit;
use actix_multipart::{Field, Multipart};
use actix_web::{get, App, HttpResponse, HttpServer, Responder, web, post, http, HttpRequest};
use actix_web::http::header::CONTENT_LENGTH;
use actix_web::middleware::Logger;
use actix_web::web::{Data, Json, ReqData};
use deadpool_redis::{Pool, Runtime};
use env_logger::Env;
use log::{error, info};
use crate::model::{Page, TokenClaims};
use mime::{Mime,IMAGE_JPEG,IMAGE_PNG};
use futures_util::TryStreamExt  as _;
use image::ImageFormat;
use actix_web_httpauth::{
    middleware::HttpAuthentication,
};
use crate::auth::{basic_auth, validator};
use crate::sanitizer::{sanitize_page, SanitizeOptions};

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Server online!")
}


const BASE_OPTION: SanitizeOptions = SanitizeOptions{
    remove_html_tags: true,
    remove_internal_spaces: true,
    trim_whitespace: true,
    convert_to_lowercase: true,
};


fn check_file(field: &Field) -> u32 {
    let legal_filetype: [Mime; 2] = [IMAGE_JPEG,IMAGE_PNG];

    let filetype: Option<&Mime> = field.content_type();
    if filetype.is_none() { return 501}
    if !legal_filetype.contains(&filetype.unwrap()) { return 502 }

    return 200

}

fn get_content_lenght(req:HttpRequest) -> usize {
    let content_lenght: usize = match req.headers().get(CONTENT_LENGTH) {
        Some(hv) => hv.to_str().unwrap_or("0").parse().unwrap(),
        None => 0,
    };

    content_lenght
}

#[post("/admin/upload_image")]
async fn upload_image(redis_pool: Data<Pool>,mut payload: Multipart, req: HttpRequest) -> HttpResponse {
    let max_file_size = 5_000_000;
    let max_file_count = 5;

    let content_lenght = get_content_lenght(req);

    if content_lenght == 0 || content_lenght > max_file_size { return HttpResponse::BadRequest().into(); }

    let mut current_count: usize = 0;


    loop {
        if current_count >= max_file_count { break }

        if let Ok(Some(mut field)) = payload.try_next().await {
            let result_check = check_file(&field);

            if result_check == 501 { return HttpResponse::BadRequest().body("File not recognized"); }
            else if result_check == 502 {return HttpResponse::BadRequest().body("File not supported");}

                let mut file_bytes = Vec::new();

                while let Ok(Some(chunk)) = field.try_next().await {
                    let data = chunk.to_vec();
                    file_bytes.extend_from_slice(&data);
                }

                let name_cleaned = sanitizer::sanitize_string(field.name(), BASE_OPTION);
                let key = format!("image-{}", name_cleaned);

                match redis::create_image(redis_pool.clone(), &key, file_bytes).await {
                    Ok(_) => {
                        current_count += 1;
                    }
                    Err(_) => {
                        return HttpResponse::InternalServerError().body("Error with the storage of image");
                    }
                }
            } else {
                break;
            }
        }

        return HttpResponse::Ok().finish();
}

#[get("/api/get_image/{name}")]
async fn get_image(redis_pool: Data<Pool>, route: web::Path<String>) -> Result<HttpResponse, actix_web::Error> {
    let name = route.into_inner();
    let name_cleaned  = sanitizer::sanitize_string(name.as_str(),BASE_OPTION);
    let image_bytes: Vec<u8> = redis::get_image(redis_pool,name_cleaned.as_str()).await.unwrap();
    let content_type = match image::guess_format(&image_bytes) {
        Ok(format) => match format {
            ImageFormat::Png => "image/png",
            ImageFormat::Jpeg => "image/jpeg",
            _ => "application/octet-stream",
        },
        Err(_) => "application/octet-stream",
    };


    Ok(HttpResponse::Ok()
        .content_type(content_type)
        .body(actix_web::web::Bytes::from(image_bytes)))

}

#[get("/api/get_page/{name}")]
async fn get_page(redis_pool: Data<Pool>, route: web::Path<String>) -> Result<HttpResponse, actix_web::Error> {
    let name = route.into_inner();
    let name_cleaned  = sanitizer::sanitize_string(name.as_str(),BASE_OPTION);
    let result = redis::get_page(redis_pool, &name_cleaned).await?;
    Ok(HttpResponse::Ok().json(result))
}

#[post("/admin/remove_page/{name}")]
async fn remove_page(redis_pool: Data<Pool>, route: web::Path<String>) -> Result<HttpResponse, actix_web::Error> {
    let name = route.into_inner();
    let name_cleaned  = sanitizer::sanitize_string(name.as_str(),BASE_OPTION);
    redis::remove(redis_pool, &name_cleaned).await?;
    Ok(HttpResponse::Ok().json({}))
}

#[get("/api/get_pages")]
async fn get_pages(redis_pool: Data<Pool>) -> Result<HttpResponse, actix_web::Error> {
    let result = redis::get_pages(redis_pool).await?;
    Ok(HttpResponse::Ok().json(result))
}

#[get("/admin/get_keys")]
async fn get_keys(redis_pool: Data<Pool>) -> Result<HttpResponse, actix_web::Error> {
    let result: Vec<String> = redis::get_keys(redis_pool).await?;
    Ok(HttpResponse::Ok().json(result))
}

#[post("/admin/create_page")]
async fn create_page(redis_pool: Data<Pool>, req_user: Option<ReqData<TokenClaims>>, body: Json<Page>) -> impl Responder {
    match req_user {
        Some(_user) => {
            let page: Page = sanitize_page(&body.into_inner());
            if redis::create_page(redis_pool, &page.id.clone(), page).await.unwrap() {
                HttpResponse::Ok().json("Page created")
            } else {
                HttpResponse::InternalServerError().json("Page creation failed")
            }
        }

        _ => HttpResponse::Unauthorized().body("<h1>Access Denied</h1>")
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // * Init logger
    env_logger::init_from_env(Env::default().default_filter_or("debug"));
    
    config::get_env_variable();

    
    // * Creation of redis config
    let cfg = deadpool_redis::Config::from_url(config::get_redis_url());
    let pool = match cfg.create_pool(Some(Runtime::Tokio1)) {
        Ok(pool) => pool,
        Err(e) => {
            log::error!("Failed to create Redis pool: {}", e);
            return Err(std::io::Error::new(std::io::ErrorKind::Other, "Failed to create Redis pool"));
        }
    };

    // * Test db connection
     match pool.get().await {
         Ok(_) => {
             info!("Connection created correctly with redis")
         }
         Err(_) => {
             error!("Error in the connection with redis");
             exit(1)
         }
     }

    // * Init the variable to share
    let pool_data = Data::new(pool);
    let pool_data_clone = pool_data.clone();

    redis::init_admin(pool_data).await.unwrap();

    let port = config::get_port().parse::<u16>().expect("Invalid port given");

    HttpServer::new(move || {
        let bearer_middleware = HttpAuthentication::bearer(validator);
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_origin("https://frontend-production-a637.up.railway.app")
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT])
            .allowed_header(http::header::CONTENT_TYPE)
            .max_age(3600);
        App::new()
            .app_data(pool_data_clone.clone())
            .service(hello)
            .service(get_page)
            .service(get_keys)
            .service(get_pages)
            .service(get_keys)
            .service(get_pages)
            .service(basic_auth)
            .service(get_image)
            .service(get_image)
            .wrap(Logger::default())
            .wrap(cors)
            .service(
                web::scope("")
                    .wrap(bearer_middleware)
                    .service(create_page)
                    .service(remove_page)
                    .service(upload_image)
                    .service(remove_page)
                    .service(upload_image)
            )
    })
        .bind(("0.0.0.0", port))?
        .run()
        .await
}

