use lazy_static::lazy_static;
use std::sync::RwLock;
use std::env;

lazy_static! {
    static ref REDIS_URl: RwLock<String> = RwLock::new("redis://:password@redis:6379".to_string());
    static ref JWT_SECRET: RwLock<String> = RwLock::new("jwtsecret".to_string());
    static ref HASH_SECRET: RwLock<String> = RwLock::new("hashsecret".to_string());
    static ref PASSWORD_ADMIN: RwLock<String> = RwLock::new("password".to_string());
    static ref PORT: RwLock<String> = RwLock::new("8000".to_string());
}

pub fn get_env_variable() {
    if let Ok(val) = env::var("URL_REDIS") {
        *REDIS_URl.write().unwrap() = val;
    }
    if let Ok(val) = env::var("JWT_SECRET") {
        *JWT_SECRET.write().unwrap() = val;
    }
    if let Ok(val) = env::var("HASH_SECRET") {
        *HASH_SECRET.write().unwrap() = val;
    }
    if let Ok(val) = env::var("PASSWORD_ADMIN") {
        *PASSWORD_ADMIN.write().unwrap() = val;
    }
    if let Ok(val) = env::var("PORT") {
        *PORT.write().unwrap() = val;
    }
}


pub fn get_redis_url() -> String {
    REDIS_URl.read().unwrap().clone()
}

pub fn get_jwt_secret() -> String {
    JWT_SECRET.read().unwrap().clone()
}

pub fn get_hash_secret() -> String {
    HASH_SECRET.read().unwrap().clone()
}

pub fn get_admin_password() -> String {
    PASSWORD_ADMIN.read().unwrap().clone()
}

pub fn get_port() -> String {
    PORT.read().unwrap().clone()
}