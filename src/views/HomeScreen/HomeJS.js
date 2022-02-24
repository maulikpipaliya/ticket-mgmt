/**
 * Home Screen
 */

function doGet(e){
    var home = HtmlService.createTemplateFromFile(routes.home.html);
    return home.evaluate();
}