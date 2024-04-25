use serde::{Serialize, Deserialize};

// * Implement of model for the representation of data

// ! Important part to be able to describe data from the backend to the db efficiently and securely
#[derive(Serialize, Deserialize, Debug)]
pub struct TestModel {
    pub name: String,
    pub age: u32,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct HTMLPage {
    pub title: String,
    pub paragraphs: Vec<Paragraph>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Paragraph {
    pub title: String,
    pub content: String,
}

#[macro_export]
macro_rules! paragraph {
    ($title:expr, $content:expr) => {
        Paragraph { title: $title.to_string(), content: $content.to_string() }
    };
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TokenClaims{
    pub(crate) id: i32
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Admin {
    pub id: i32,
    pub username: String,
    pub password: String,
}
