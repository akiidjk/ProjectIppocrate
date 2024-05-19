// File with redis call

use actix_web::web::Data;
use deadpool_redis::Pool;
use deadpool_redis::redis::cmd;
use crate::auth::create_user;
use crate::error_manager::ErrorManager;
use crate::model::{Admin, Page};
use uuid::Uuid;
use crate::config;

// * --------------------------- MACRO ----------------------------

#[macro_export]
macro_rules! set_redis_value {
    ($conn:expr, $key:expr, $value:expr) => {
        cmd("SET")
            .arg(&[$key, $value])
            .query_async::<_, ()>(&mut $conn)
            .await?
    };
}

macro_rules! set_redis_image {
    ($conn:expr, $key:expr, $value:expr) => {
        let _: () = redis::cmd("SET")
        .arg($key)
        .arg($value)
        .query_async(&mut $conn).await?;
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
// pub async fn create_string(redis_pool: Data<Pool>, key: &str, value: &str) -> Result<bool, ErrorManager> {
//     let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;
//
//     set_redis_value!(conn, key, value);
//
//     Ok(true)
// }

pub async fn create_image(redis_pool: Data<Pool>, key: &str, value: Vec<u8>) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    set_redis_image!(conn, key, value);

    Ok(true)
}

pub async fn create_page(redis_pool: Data<Pool>, key:&str, value: Page) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let value_str = serde_json::to_string(&value)?;

    set_redis_value!(conn, key.to_string(), value_str);

    Ok(true)
}


fn generate_html(page_data: &mut Page) -> () {
    for paragraph in page_data.page.paragraphs.iter_mut() {
        let mut title_attributes: String = "title_paragraph font-bold mb-".to_string();
        let mut image_classnames: String = String::new();
        match paragraph.layout_type {
            1 => {
                title_attributes += "4";
                image_classnames = "rounded-2xl image".to_string();
            }

            2 => {
                title_attributes += "4";
                image_classnames = "me-auto ms-auto rounded-full".to_string();
            }
            _ => {
                title_attributes += "10 text-center";
            }
        }
            paragraph.image_source = format!("<Image width={{960}} height={{570}} fill={{true}} class=\"{}\" src=\"{}\" alt={{\"image\"}} />", image_classnames, paragraph.image_source);

            paragraph.title = format!("<h1 class=\"{}\">{}</h1>", title_attributes, paragraph.title);
            paragraph.content = format!("<p>{}</p>", paragraph.content);
        }
}




pub async fn remove(redis_pool: Data<Pool>, key: &str) -> Result<bool, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;
    remove_redis_value!(conn, key);
    Ok(true)
}


// * ---------------------------- GET ---------------------------------

// pub async fn get_string(redis_pool: Data<Pool>, key: &str) -> Result<String, ErrorManager> {
//     let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;
//
//     let value: String = get_redis_value!(conn, key);
//     Ok(value)
// }

pub async fn get_image(redis_pool: Data<Pool>, key: &str) -> Result<Vec<u8>, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let value: Vec<u8> = get_redis_value!(conn, key);
    Ok(value)
}


pub async fn get_page(redis_pool: Data<Pool>, key: &str) -> Result<Page, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let value_str: String = get_redis_value!(conn, key);

    let mut result: Page = serde_json::from_str(&value_str)
        .map_err(ErrorManager::SerdeError)?;

    generate_html(&mut result);

    Ok(result)
}

pub async fn get_keys(redis_pool: Data<Pool>) -> Result<Vec<String>, ErrorManager> {
    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let mut cursor: u64 = 0;
    let mut all_keys: Vec<String> = Vec::new();

    loop {
        let (new_cursor, mut keys): (u64, Vec<String>) = redis::cmd("SCAN")
            .arg(cursor)
            .query_async(&mut conn)
            .await?;

        keys.retain(|x| {
            x != "auth/admin" && !x.contains("image-")
        });

        all_keys.extend(keys);

        if new_cursor == 0 {
            break;
        }

        cursor = new_cursor;
    }



    Ok(all_keys)
}

pub async fn get_pages(redis_pool: Data<Pool>) -> Result<Vec<Page>, ErrorManager> {

    let keys: Vec<String> = get_keys(redis_pool.clone()).await?;
    let mut pages:Vec<Page> = vec![];

    for key in keys{
        pages.push(get_page(redis_pool.clone(),key.as_str()).await?)
    }
    Ok(pages)
}

// * ---------------------------- AUTHENTICATION ----------------------------

pub async fn init_admin(redis_pool: Data<Pool>) -> Result<bool, ErrorManager> {

    let value = Admin {
        id: Uuid::new_v4().to_string(),
        username: "admin".to_string(),
        password: config::get_admin_password().to_string()
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



