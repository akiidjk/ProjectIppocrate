mod data;
mod model;
mod redis;
mod error_manager;

use std::process::exit;
use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use actix_web::middleware::Logger;
use actix_web::web::Data;
use deadpool_redis::{Config, Pool, Runtime};
use env_logger::Env;
use log::{error, info};
use crate::model::{TestModel, HTMLPage, Paragraph};
use crate::redis::{redis_create_page, redis_create_strings, redis_get_page, redis_generate_html, redis_get_string, redis_remove};
use crate::data::URL_REDIS;

//Only for developing
use rand::{Rng, thread_rng};

macro_rules! paragraph {
    ($title:expr, $content:expr) => {
        Paragraph { title: $title.to_string(), content: $content.to_string() }
    };
}

#[get("/")]
async fn hello() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[get("/test")] //Simple test endpoint
async fn test(pool: Data<Pool>) -> Result<HttpResponse, actix_web::Error> {

    // * Creation of test model
    let value = HTMLPage {
        title: "test page".to_string(),
        paragraphs: vec!(paragraph!("mimmo", "questo e' un ricchissimo paragrafo"), 
                         paragraph!("paragrafo2", "godo forte")),
    };

    // * RANDOM NUMBER FOR TESTING
    let random_number: u32 = thread_rng().gen_range(1..=10000);
    let key = format!("deadpool/test_key{}", random_number);
    let random_number1: u32 = thread_rng().gen_range(1..=10000);
    let key1 = format!("deadpool/test_key{}", random_number1);

    // * USE OF FUNCTION (write)
    redis_create_strings(pool.clone(), &key, "Ciao").await?;
    redis_create_page(pool.clone(), &key1, value).await?;

    println!("{}", key);
    println!("{}", key1);

    let result_page: String = redis_generate_html(pool.clone(), &key1).await?;

    Ok(HttpResponse::Ok().body(result_page))
}




#[actix_web::main]
async fn main() -> std::io::Result<()> {

    // * Init logger
    env_logger::init_from_env(Env::default().default_filter_or("debug"));

    // * Creation of redis config
    let cfg = Config::from_url(URL_REDIS);
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

    HttpServer::new(move || {
        App::new()
            .app_data(pool_data.clone())
            .service(hello)
            .service(test)
            .wrap(Logger::default())
    })
        .bind(("0.0.0.0", 8000))?
        .run()
        .await
}
