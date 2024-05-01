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

    let mut result: HTMLPage = serde_json::from_str(&value_str)
        .map_err(ErrorManager::SerdeError)?;

    generate_html(&mut result);

    Ok(result)
}

fn generate_html(page_data: &mut HTMLPage) -> () {
    page_data.title = format!("<title>{}</title>", page_data.title);

    for paragraph in page_data.paragraphs.iter_mut() {
        println!("layout type: {}", paragraph.layout_type);
        let mut title_attributes: String = "lg:text-[54px] sm:text-[34px] font-bold mb-".to_string();
        let mut image_classnames: String = String::new();
        match paragraph.layout_type {
            1 => {
                title_attributes += "4";
                image_classnames = "rounded-2xl".to_string();
            }
            2 => { 
                title_attributes += "4";
                image_classnames = "me-auto ms-auto rounded-full".to_string();
            }
            _ => { 
                title_attributes += "10 text-center";
            }
        }
        println!("INFO: images: ");
        
        for s in paragraph.image_sources.iter_mut() {
            *s = format!("<Image width={{1070}} height={{570}} className=\"{}\" src={{\"{}\"}} alt={{\"image\"}} />", image_classnames, s);
            println!("{}", *s);
        }
        
        paragraph.title = format!("<h1 className=\"{}\">{}</h1>", title_attributes, paragraph.title); 
        paragraph.content = format!("<p>{}</p>", paragraph.content);
    }
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