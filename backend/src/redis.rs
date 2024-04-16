// File with redis call

use actix_web::web::{Data};
use deadpool_redis::{Pool};
use deadpool_redis::redis::cmd;
use crate::error_manager::ErrorManager;
use crate::model::HTMLPage;

// * --------------------------- MACRO ----------------------------

macro_rules! set_redis_value {
    ($conn:expr, $key:expr, $value:expr) => {
        cmd("SET")
            .arg(&[$key, $value.to_string()])
            .query_async::<_, ()>(&mut $conn)
            .await?
    };
}

macro_rules! get_redis_value {
    ($conn:expr, $key:expr) => {
        cmd("GET")
        .arg(&$key)
        .query_async(&mut $conn)
        .await
        .map_err(ErrorManager::RedisError)?
    };
}

macro_rules! remove_redis_value {
    ($conn:expr, $key:expr) => {
        cmd("DEL").
        arg(&$key).
        query_async::<_, ()>(&mut $conn)
        .await?
    };
}

// * ---------------------------- CREATION ---------------------------------
pub async fn redis_create_strings(pool: Data<Pool>, key: &str, value: &str) -> Result<bool, ErrorManager> {
    let mut conn = pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);

    set_redis_value!(conn, formatted_key, value.to_string());

    Ok(true)
}

pub async fn redis_create_page(pool: Data<Pool>, key:&str, value: HTMLPage) -> Result<bool, ErrorManager> {
    let mut conn = pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str = serde_json::to_string(&value)?;

    set_redis_value!(conn, formatted_key, value_str);

    Ok(true)
}

// * ---------------------------- GET ---------------------------------

pub async fn redis_get_string(pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
    let mut conn = pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value: String = get_redis_value!(conn,formatted_key);
    Ok(value)
}


pub async fn redis_get_page(pool: Data<Pool>, key: &str) -> Result<HTMLPage, ErrorManager> {
    let mut conn = pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str: String = get_redis_value!(conn,formatted_key);

    let model: HTMLPage = serde_json::from_str(&value_str)
        .map_err(ErrorManager::SerdeError)?;

    Ok(model)
}

pub async fn redis_generate_html(pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
    let page_data: HTMLPage = redis_get_page(pool, key).await?;
    
    let mut result: String = format!("<title>{}</title>\n", page_data.title);

    for p in page_data.paragraphs.iter() {
        result.push_str(&format!("<p>{}</p>\n{}", p.title, p.content));
    }

    Ok(result)
}

pub async fn redis_remove(pool: Data<Pool>,key: &str) -> Result<bool, ErrorManager> {
    let mut conn = pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);

    remove_redis_value!(conn,formatted_key);

    Ok(true)
}

//
// pub async fn redis_modify(pool: Data<Pool>) -> Result<bool, RedisError> {
//     let mut conn = pool.get().await.map_err(|_| RedisError::from((redis::ErrorKind::IoError, "Failed to get connection from pool")))?;
// }
//
