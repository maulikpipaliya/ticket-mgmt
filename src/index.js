/**
 * Home Screen
 */

function doGet(e) {
    Router.path("", renderHome);
    Router.path("home", renderHome);

    if (Router[e.parameter.path]) return Router[e.parameter.path]();
    else return renderPageNotFound();
}

function renderHome() {
    return render(routes.home.html);
}

function renderPageNotFound() {
    return HtmlService.createHtmlOutput(
        '<h1 style="color:red;">Page Not Found</h1>'
    );
}


function sayJoyy(){
    return "Joyy";
}