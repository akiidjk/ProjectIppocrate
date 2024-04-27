// File with redis call

use actix_web::web::Data;
use deadpool_redis::Pool;
use deadpool_redis::redis::cmd;
use crate::auth::create_user;
use crate::error_manager::ErrorManager;
use crate::model::{Admin, HTMLPage};
use uuid::Uuid;
use crate::data::PASSWORD_ADMIN;
// * --------------------------- MACRO ----------------------------

#[macro_export]
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
pub async fn create_string(redis_pool: Data<Pool>, key: &str, value: &str) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);

    set_redis_value!(conn, formatted_key, value.to_string());

    Ok(true)
}

pub async fn create_page(redis_pool: Data<Pool>, key:&str, value: HTMLPage) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str = serde_json::to_string(&value)?;

    set_redis_value!(conn, formatted_key, value_str);

    Ok(true)
}

// * ---------------------------- GET ---------------------------------

pub async fn get_string(redis_pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value: String = get_redis_value!(conn, formatted_key);
    Ok(value)
}


pub async fn get_page(redis_pool: Data<Pool>, key: &str) -> Result<HTMLPage, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);
    let value_str: String = get_redis_value!(conn, formatted_key);

    let model: HTMLPage = serde_json::from_str(&value_str)
        .map_err(ErrorManager::SerdeError)?;

    Ok(model)
}

pub async fn generate_html(redis_pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
    let page_data: HTMLPage = get_page(redis_pool, key).await?;
    
    let mut result: String = format!("<title>{}</title>\n", page_data.title);

    for paragraph in page_data.paragraphs.iter() {
        result.push_str(&format!("<p>{}</p>\n{}", paragraph.title, paragraph.content));
    }

    Ok(result)
}

pub async fn remove(redis_pool: Data<Pool>, key: &str) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let formatted_key = format!("deadpool/{}", key);

    remove_redis_value!(conn, formatted_key);

    Ok(true)
}


// * ---------------------------- AUTHENTICATION ----------------------------

pub async fn init_admin(redis_pool: Data<Pool>) -> Result<bool, ErrorManager> {

    let value = Admin {
        id: Uuid::new_v4().to_string(),
        username: "admin".to_string(),
        password: PASSWORD_ADMIN.to_string()
    };

    match create_user(redis_pool, value).await {
        Ok(_) => {
            Ok(true)
        }
        Err(error) => {
            log::error!("{:?}",error);
            Ok(false)
        }
    }
}

pub async fn get_admin(redis_pool: Data<Pool>) -> Result<Admin, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let key: String = "auth/admin".to_string();
    let value: String =  get_redis_value!(conn,key);

    let model: Admin = serde_json::from_str(&value)
        .map_err(ErrorManager::SerdeError)?;

    Ok(model)
}