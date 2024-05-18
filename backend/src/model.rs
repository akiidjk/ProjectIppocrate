use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug,Clone)]
pub struct Page{
    pub id: String,
    pub page: HTMLPage,
    pub time:String
}
#[derive(Serialize, Deserialize, Debug,Clone)]
pub struct HTMLPage {
    pub title: String,
    pub paragraphs: Vec<Paragraph>,
}

#[derive(Serialize, Deserialize, Debug,Clone)]
pub struct Paragraph {
    pub title: String,
    pub content: String,
    pub image_source: String,
    pub layout_type: u16,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct TokenClaims{
    pub(crate) id: String
}

#[derive(Serialize, Deserialize, Debug)]
pub struct Admin {
    pub id: String,
    pub username: String,
    pub password: String,
}

#[macro_export]
macro_rules! paragraph {
    ($title:expr, $content:expr, $image_props:expr, $layout_type:expr) => {
        Paragraph { title: $title.to_string(), content: $content.to_string(), image_source: $image_props, layout_type: $layout_type }
    };
}