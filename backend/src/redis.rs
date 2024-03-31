// File with redis call

use actix_web::web::{Data};
use deadpool_redis::{Pool};
use deadpool_redis::redis::cmd;
use crate::error_manager::ErrorManager;
use crate::model::{TestModel};

// * ---------------------------- CREATION ---------------------------------
pub async fn redis_create_strings(pool: Data<Pool>, key: &str, value: &str) -> Result<bool, ErrorManager> {
    let mut conn = pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);

    cmd("SET")
        .arg(&[&formatted_key, &value.to_string()])
        .query_async::<_, ()>(&mut conn)
        .await?;

    Ok(true)
}

pub async fn redis_create_json(pool: Data<Pool>,key:&str,value: TestModel) -> Result<bool, ErrorManager> {
    let mut conn = pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str = serde_json::to_string(&value)?;

    cmd("SET")
        .arg(&[&formatted_key, &value_str])
        .query_async::<_, ()>(&mut conn)
        .await?;

    Ok(true)
}

// * ---------------------------- GET ---------------------------------

pub async fn redis_get_string(pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
    let mut conn = pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value: String = cmd("GET")
        .arg(&formatted_key)
        .query_async(&mut conn)
        .await
        .map_err(ErrorManager::RedisError)?;

    Ok(value)
}


pub async fn redis_get_json(pool: Data<Pool>, key: &str) -> Result<TestModel, ErrorManager> {
    let mut conn = pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str: String = cmd("GET")
        .arg(&formatted_key)
        .query_async(&mut conn)
        .await
        .map_err(ErrorManager::RedisError)?;

    let model: TestModel = serde_json::from_str(&value_str)
        .map_err(ErrorManager::SerdeError)?;

    Ok(model)
}



//
// pub async fn redis_modify(pool: Data<Pool>) -> Result<bool, RedisError> {
//     let mut conn = pool.get().await.map_err(|_| RedisError::from((redis::ErrorKind::IoError, "Failed to get connection from pool")))?;
// }
//
// pub async fn redis_remove(pool: Data<Pool>) -> Result<bool, RedisError> {
//     let mut conn = pool.get().await.unwrap();
// }