use deadpool_redis::redis::cmd;
use actix_web::{dev::ServiceRequest, error::Error, web::{Data}, HttpMessage, get, Responder, HttpResponse};

use actix_web_httpauth::{
    extractors::{
        bearer::{self, BearerAuth},
        AuthenticationError,
    },
};
use actix_web_httpauth::extractors::basic::BasicAuth;
use argonautica::{Hasher, Verifier};
use deadpool_redis::Pool;
use hmac::{Hmac, Mac};
use jwt::{SignWithKey, VerifyWithKey};
use sha2::Sha256;
use crate::data::{HASH_SECRET, JWT_SECRET};
use crate::error_manager::ErrorManager;

use crate::model::{TokenClaims, Admin};
use crate::redis::get_admin;
use crate::set_redis_value;


pub async fn create_user(redis_pool: Data<Pool>, body: Admin) -> Result<String, ErrorManager> {
    let mut user: Admin = body;

    let mut conn = redis_pool.get().await.map_err(ErrorManager::PoolError)?;

    let hash_secret = HASH_SECRET.to_string();
    let mut hasher = Hasher::default();
    let hash = hasher
        .with_password(user.password)
        .with_secret_key(hash_secret)
        .hash()
        .unwrap();

    user.password = hash;

    let user_string = serde_json::to_string(&user)?;

    let key: String = "auth/admin".to_string();

    set_redis_value!(conn, key, user_string);

    Ok("User created successfully".to_string())
}

#[get("/admin/auth")]
pub async fn basic_auth(redis_pool: Data<Pool>, credentials: BasicAuth) -> impl Responder {

    let jwt_secret: Hmac<Sha256> = Hmac::new_from_slice(
        JWT_SECRET
            .as_bytes(),
    ).unwrap();

    match credentials.password() {
        None => HttpResponse::Unauthorized().json("Must provide username and password"),
        Some(pass) => {
            match get_admin(redis_pool).await
            {
                Ok(user) => {
                    let hash_secret =
                        HASH_SECRET.to_string();
                    let mut verifier = Verifier::default();
                    let is_valid = verifier
                        .with_hash(user.password)
                        .with_password(pass)
                        .with_secret_key(hash_secret)
                        .verify()
                        .unwrap();

                    if is_valid {
                        let claims = TokenClaims { id: user.id };
                        let token_str = claims.sign_with_key(&jwt_secret).unwrap();
                        HttpResponse::Ok().json(token_str)
                    } else {
                        HttpResponse::Unauthorized().json("Incorrect password")
                    }
                }
                Err(error) => HttpResponse::InternalServerError().json(format!("{:?}", error)),
            }
        }
    }
}



pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let jwt_secret: String = JWT_SECRET.to_string();
    let key: Hmac<Sha256> = Hmac::new_from_slice(jwt_secret.as_bytes()).unwrap();
    let token_string = credentials.token();

    let claims: Result<TokenClaims, &str> = token_string
        .verify_with_key(&key)
        .map_err(|_| "Invalid token");

    match claims {
        Ok(value) => {
            req.extensions_mut().insert(value);
            Ok(req)
        }
        Err(_) => {
            let config = req
                .app_data::<bearer::Config>()
                .cloned()
                .unwrap_or_default()
                .scope("");

            Err((AuthenticationError::from(config).into(), req))
        }
    }
}

