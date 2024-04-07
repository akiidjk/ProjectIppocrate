use serde::{Serialize, Deserialize};

// * Implement of model for the representation of data

// ! Important part to be able to describe data from the backend to the db efficiently and securely
#[derive(Serialize, Deserialize,Debug)]
pub struct TestModel {
    pub name: String,
    pub age: u32,
}

#[derive(Debug, Deserialize)]
pub struct PageRequest {
    pub(crate) id: u64,
    // pub(crate) response_type: String, //to replace with the model of page
}

#[derive(Deserialize)]
pub struct AuthInfo {
    pub(crate) username: String,
    pub(crate) password: String,
}