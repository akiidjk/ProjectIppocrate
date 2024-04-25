mod data;
mod model;
mod redis;
mod error_manager;
mod auth;

use std::process::exit;
use actix_web::{get, App, HttpResponse, HttpServer, Responder, web, post};
use actix_web::middleware::Logger;
use actix_web::web::Data;
use deadpool_redis::{Pool, Runtime};
use env_logger::{Env, init};
use log::{error, info};
use crate::model::{HTMLPage, Paragraph};
use crate::data::URL_REDIS;

use actix_web_httpauth::{
    extractors::{
        bearer::{self,BearerAuth},
        AuthenticationError
    },
    middleware::HttpAuthentication,
};
use hmac::{Hmac,Mac};
use jwt::VerifyWithKey;
use serde::{Deserialize,Serialize};
use sha2::Sha256;



//Only for developing
use rand::{Rng, thread_rng};
use crate::auth::{basic_auth, validator};
// use crate::auth::{login, validator};
use crate::redis::init_admin;

#[get("/")]
async fn hello() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[get("/test")] //Simple test endpoint
async fn test(redis_pool: Data<Pool>) -> Result<HttpResponse, actix_web::Error> {

    // * Creation of test model
    let response_content = HTMLPage {
        title: "test page".to_string(),
        paragraphs: vec!(paragraph!("mimmo", "questo e' un ricchissimo paragrafo"), 
                         paragraph!("paragrafo2", "godo forte")),
    };

    let rnd: u32 = thread_rng().gen_range(1..=10000);
    let key = format!("deadpool/test_key{}", rnd);

    redis::create_page(redis_pool.clone(), &key, response_content).await?;

    println!("{}", key);

    let password = redis::get_admin(redis_pool.clone()).await?;
    println!("{:?}", password);

    let response_page: String = redis::generate_html(redis_pool.clone(), &key).await?;

    Ok(HttpResponse::Ok().body(response_page))
}


#[get("/get_page")]
async fn get_page() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[post("/admin/create_page")]
async fn create_page() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // * Init logger
    env_logger::init_from_env(Env::default().default_filter_or("debug"));

    // * Creation of redis config
    let cfg = deadpool_redis::Config::from_url(URL_REDIS);
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

    HttpServer::new(move || {
        // let bearer_middleware = HttpAuthentication::bearer(validator);
        App::new()
            .app_data(pool_data_clone.clone())
            .service(hello)
            .service(test)
            .service(basic_auth)
            .wrap(Logger::default())
            // .service( // TODO FIX VALIDATOR
            //     web::scope("")
            //         .wrap(bearer_middleware)
            //         .service(basic_auth)
            // )
    })
        .bind(("0.0.0.0", 8000))?
        .run()
        .await
}
