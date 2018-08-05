/*
 * utils file
 */


/*
 * Logger
 */
class Logger{
}

Logger.log = m => {
    console.log(m)
}


/*
 * Toast
 */
class Message{

}

Message.show = m => {
    $.snackbar({content: m, timeout: 3000})
}


/*
 * Browser Utils
 */
class Browser{}

Browser.getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class Utils{}

const REPLACE_TABLE = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
}

Utils._replaceTag = (tag) => {
    return REPLACE_TABLE[tag] || tag
}

Utils.safe_tags_replace = (str) => {
    return str.replace(/[&<>]/g, Utils._replaceTag)
}