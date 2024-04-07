use serde::{Serialize, Deserialize};

// * Implement of model for the representation of data

// ! Important part to be able to describe data from the backend to the db efficiently and securely
#[derive(Serialize, Deserialize,Debug)]
pub struct TestModel {
    pub name: String,
    pub age: u32,
}

