mod data;

use actix_web::{get, App, HttpResponse, HttpServer, Responder, web};
use actix_web::middleware::Logger;
use env_logger::Env;
use log::{info, warn, error};
use redis::{Client, RedisResult};
use crate::data::URL_REDIS;

#[get("/")]
async fn hello() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(Env::default().default_filter_or("info"));

    // Setup Redis
    let client = Client::open(URL_REDIS).expect("Failed to create Redis client");

    match client.get_connection() {
        Ok(_) => info!("Connection created with Redis"),
        Err(err) => error!("Failed to create connection with Redis: {}", err),
    }

    HttpServer::new(|| {
        App::new()
            .service(hello)
            .wrap(Logger::default())
    })
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}
