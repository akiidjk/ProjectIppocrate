use std::borrow::Cow;
use regex::Regex;
use crate::model::{HTMLPage, Page, Paragraph};

extern crate regex;
#[derive(Default, Clone, Copy)]
pub struct SanitizeOptions {
    pub(crate) remove_html_tags: bool,
    pub(crate) remove_internal_spaces: bool,
    pub(crate) trim_whitespace: bool,
    pub(crate) convert_to_lowercase: bool,
}

const ANTI_XSS_REGEX: &str = r##"<[^\\w<>]*(?:[^<>"'\\s]*:)?[^\\w<>]*(?:\\W*s\\W*c\\W*r\\W*i\\W*p\\W*t|\\W*f\\W*o\\W*r\\W*m|\\W*s\\W*t\\W*y\\W*l\\W*e|\\W*s\\W*v\\W*g|\\W*m\\W*a\\W*r\\W*q\\W*u\\W*e\\W*e|(?:\\W*l\\W*i\\W*n\\W*k|\\W*o\\W*b\\W*j\\W*e\\W*c\\W*t|\\W*e\\W*m\\W*b\\W*e\\W*d|\\W*a\\W*p\\W*p\\W*l\\W*e\\W*t|\\W*p\\W*a\\W*r\\W*a\\W*m|\\W*i?\\W*f\\W*r\\W*a\\W*m\\W*e|\\W*b\\W*a\\W*s\\W*e|\\W*b\\W*o\\W*d\\W*y|\\W*m\\W*e\\W*t\\W*a|\\W*i\\W*m\\W*a?\\W*g\\W*e?|\\W*v\\W*i\\W*d\\W*e\\W*o|\\W*a\\W*u\\W*d\\W*i\\W*o|\\W*b\\W*i\\W*n\\W*d\\W*i\\W*n\\W*g\\W*s|\\W*s\\W*e\\W*t|\\W*i\\W*s\\W*i\\W*n\\W*d\\W*e\\W*x|\\W*a\\W*n\\W*i\\W*m\\W*a\\W*t\\W*e)[^>\\w])|(?:<\\w[\\s\\S]*[\\s\\\\0\\/]|['"])(?:formaction|style|background|src|lowsrc|ping|on(?:d(?:e(?:vice(?:(?:orienta|mo)tion|proximity|found|light)|livery(?:success|error)|activate)|r(?:ag(?:e(?:n(?:ter|d)|xit)|(?:gestur|leav)e|start|drop|over)?|op)|i(?:s(?:c(?:hargingtimechange|onnect(?:ing|ed))|abled)|aling)|ata(?:setc(?:omplete|hanged)|(?:availabl|chang)e|error)|urationchange|ownloading|blclick)|Moz(?:M(?:agnifyGesture(?:Update|Start)?|ouse(?:PixelScroll|Hittest))|S(?:wipeGesture(?:Update|Start|End)?|crolledAreaChanged)|(?:(?:Press)?TapGestur|BeforeResiz)e|EdgeUI(?:C(?:omplet|ancel)|Start)ed|RotateGesture(?:Update|Start)?|A(?:udioAvailable|fterPaint))|c(?:o(?:m(?:p(?:osition(?:update|start|end)|lete)|mand(?:update)?)|n(?:t(?:rolselect|extmenu)|nect(?:ing|ed))|py)|a(?:(?:llschang|ch)ed|nplay(?:through)?|rdstatechange)|h(?:(?:arging(?:time)?ch)?ange|ecking)|(?:fstate|ell)change|u(?:echange|t)|l(?:ick|ose))|m(?:o(?:z(?:pointerlock(?:change|error)|(?:orientation|time)change|fullscreen(?:change|error)|network(?:down|up)load)|use(?:(?:lea|mo)ve|o(?:ver|ut)|enter|wheel|down|up)|ve(?:start|end)?)|essage|ark)|s(?:t(?:a(?:t(?:uschanged|echange)|lled|rt)|k(?:sessione|comma)nd|op)|e(?:ek(?:complete|ing|ed)|(?:lec(?:tstar)?)?t|n(?:ding|t))|u(?:ccess|spend|bmit)|peech(?:start|end)|ound(?:start|end)|croll|how)|b(?:e(?:for(?:e(?:(?:scriptexecu|activa)te|u(?:nload|pdate)|p(?:aste|rint)|c(?:opy|ut)|editfocus)|deactivate)|gin(?:Event)?)|oun(?:dary|ce)|l(?:ocked|ur)|roadcast|usy)|a(?:n(?:imation(?:iteration|start|end)|tennastatechange)|fter(?:(?:scriptexecu|upda)te|print)|udio(?:process|start|end)|d(?:apteradded|dtrack)|ctivate|lerting|bort)|DOM(?:Node(?:Inserted(?:IntoDocument)?|Removed(?:FromDocument)?)|(?:CharacterData|Subtree)Modified|A(?:ttrModified|ctivate)|Focus(?:Out|In)|MouseScroll)|r(?:e(?:s(?:u(?:m(?:ing|e)|lt)|ize|et)|adystatechange|pea(?:tEven)?t|movetrack|trieving|ceived)|ow(?:s(?:inserted|delete)|e(?:nter|xit))|atechange)|p(?:op(?:up(?:hid(?:den|ing)|show(?:ing|n))|state)|a(?:ge(?:hide|show)|(?:st|us)e|int)|ro(?:pertychange|gress)|lay(?:ing)?)|t(?:ouch(?:(?:lea|mo)ve|en(?:ter|d)|cancel|start)|ime(?:update|out)|ransitionend|ext)|u(?:s(?:erproximity|sdreceived)|p(?:gradeneeded|dateready)|n(?:derflow|load))|f(?:o(?:rm(?:change|input)|cus(?:out|in)?)|i(?:lterchange|nish)|ailed)|l(?:o(?:ad(?:e(?:d(?:meta)?data|nd)|start)?|secapture)|evelchange|y)|g(?:amepad(?:(?:dis)?connected|button(?:down|up)|axismove)|et)|e(?:n(?:d(?:Event|ed)?|abled|ter)|rror(?:update)?|mptied|xit)|i(?:cc(?:cardlockerror|infochange)|n(?:coming|valid|put))|o(?:(?:(?:ff|n)lin|bsolet)e|verflow(?:changed)?|pen)|SVG(?:(?:Unl|L)oad|Resize|Scroll|Abort|Error|Zoom)|h(?:e(?:adphoneschange|l[dp])|ashchange|olding)|v(?:o(?:lum|ic)e|ersion)change|w(?:a(?:it|rn)ing|heel)|key(?:press|down|up)|(?:AppComman|Loa)d|no(?:update|match)|Request|zoom))[\\s\\\\0]*="##;
pub fn sanitize_string(input: &str, options: SanitizeOptions) -> String {
    let mut current_string = Cow::from(input);

    if options.remove_html_tags {
        let re = Regex::new(ANTI_XSS_REGEX).unwrap();
        current_string = Cow::from(re.replace_all(&current_string, "").into_owned());
    }

    let re = Regex::new(r"[^\x00-\x7F]").unwrap();
    current_string = Cow::from(re.replace_all(&current_string, "").into_owned());

    if options.remove_internal_spaces {
        let re = Regex::new(r"\s+").unwrap();
        current_string = Cow::from(re.replace_all(&current_string, "").into_owned());
    }

    if options.trim_whitespace {
        let trimmed = current_string.trim().to_owned();
        current_string = Cow::from(trimmed);
    }

    if options.convert_to_lowercase {
        let lowered = current_string.to_lowercase();
        current_string = Cow::from(lowered);
    }

    current_string.into_owned()
}



pub fn sanitize_page(page: &Page) -> Page {
    let mut sanitized_page = page.clone();

    let options_high: SanitizeOptions = SanitizeOptions {
        remove_html_tags: true,
        remove_internal_spaces: true,
        trim_whitespace: true,
        convert_to_lowercase: true,
    };

    sanitized_page.id = sanitize_string(&sanitized_page.id, options_high);
    sanitized_page.page = sanitize_html_page(&sanitized_page.page);

    sanitized_page
}

pub fn sanitize_html_page(html_page: &HTMLPage) -> HTMLPage {
    let mut sanitized_html_page = html_page.clone();

    let options_standard: SanitizeOptions = SanitizeOptions {
        remove_html_tags: true,
        remove_internal_spaces: false,
        trim_whitespace: true,
        convert_to_lowercase: false,
    };

    sanitized_html_page.title = sanitize_string(&sanitized_html_page.title, options_standard);

    sanitized_html_page.paragraphs = sanitized_html_page
        .paragraphs
        .iter()
        .map(|paragraph| sanitize_paragraph(paragraph))
        .collect();

    sanitized_html_page
}

fn sanitize_paragraph(paragraph: &Paragraph) -> Paragraph {
    let mut sanitized_paragraph = paragraph.clone();

    let options_standard:SanitizeOptions = SanitizeOptions {
        remove_html_tags: true,
        remove_internal_spaces: false,
        trim_whitespace: true,
        convert_to_lowercase: false,
    };

    sanitized_paragraph.title = sanitize_string(&sanitized_paragraph.title, options_standard);
    sanitized_paragraph.content = sanitize_string(&sanitized_paragraph.content, options_standard);
    sanitized_paragraph.image_source = sanitize_string(&sanitized_paragraph.image_source,options_standard);

    sanitized_paragraph
}
