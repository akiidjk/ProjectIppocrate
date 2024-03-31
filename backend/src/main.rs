mod data;
mod model;

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use actix_web::middleware::Logger;
use actix_web::web::Data;
use deadpool_redis::{Config, Pool, Runtime};
use deadpool_redis::redis::cmd;
use env_logger::Env;
use log::{info};
use serde_json::json;

use crate::data::URL_REDIS;


#[get("/")]
async fn hello() -> impl Responder {
    info!("Handling request for /hello endpoint");
    HttpResponse::Ok().body("Server online!")
}

#[get("/test")]
async fn test(pool: Data<Pool>) -> impl Responder {

    let value = json!({
        "name": "John Doe",
        "age": 30,
        "is_active": false
    });

    let value_str:&str = &*serde_json::to_string(&value).unwrap();
    let mut conn = pool.get().await.unwrap();

    cmd("SET")
            .arg(&["deadpool/test_key1", &value_str])
            .query_async::<_, ()>(&mut conn)
            .await.unwrap();

    HttpResponse::Ok().body("test")
}




#[actix_web::main]
async fn main() -> std::io::Result<()> {

    env_logger::init_from_env(Env::default().default_filter_or("info"));
    
    let cfg = Config::from_url(URL_REDIS);
    let pool = cfg.create_pool(Some(Runtime::Tokio1)).unwrap();
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
