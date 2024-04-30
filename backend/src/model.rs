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
    pub image_sources: Vec<String>,
    pub layout_type: u16,
}

#[macro_export]
macro_rules! paragraph {
    ($title:expr, $content:expr, $image_props:expr, $layout_type:expr) => {
        Paragraph { title: $title.to_string(), content: $content.to_string(), image_sources: $image_props, layout_type: $layout_type }
    };
}