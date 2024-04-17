use thiserror::Error;
use deadpool_redis::PoolError;
use deadpool_redis::redis::RedisError as DeadpoolRedisError;
use serde_json::Error as SerdeJsonError;
use actix_web::{HttpResponse, ResponseError};
use actix_web::http::StatusCode;

#[derive(Debug, Error)]
pub enum ErrorManager {
    #[error("Redis operation failed: {0}")]
    RedisError(#[from] DeadpoolRedisError),

    #[error("Serialization error: {0}")]
    SerdeError(#[from] SerdeJsonError),

    #[error("Pool error: {0}")]
    PoolError(#[from] PoolError),
}

// * Implement of method for manage error
impl ResponseError for ErrorManager {
    fn status_code(&self) -> StatusCode {
        match *self {
            ErrorManager::RedisError(_) => StatusCode::INTERNAL_SERVER_ERROR,
            ErrorManager::SerdeError(_) => StatusCode::BAD_REQUEST,
            ErrorManager::PoolError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
            log::error!("Handling error: {}", self);
            HttpResponse::new(self.status_code())
    }
}
