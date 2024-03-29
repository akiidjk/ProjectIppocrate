mod data;

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use redis::{Client, RedisResult};
use crate::data::URL_REDIS;

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("Server online!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server started");

    // Setup Redis
    let client = Client::open(URL_REDIS).expect("Failed to create Redis client");

    match client.get_connection() {
        Ok(_) => println!("Connection created with Redis"),
        Err(err) => println!("Failed to create connection with Redis: {}", err),
    }
    
    HttpServer::new(|| {
        App::new()
            .service(hello)
    })
        .bind(("0.0.0.0", 8080))?
        .run()
        .await
}
