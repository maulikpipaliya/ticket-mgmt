/**
 * Home Screen
 */

function doGet(e) {
    Router.path("", renderHome);
    Router.path("/", renderHome);
    Router.path("home", renderHome);
    Router.path("createTicket", renderCreateTicket);

    if (Router[e.parameter.path]) return Router[e.parameter.path]();
    else return renderPageNotFound();
}

function renderHome() {
    return render("views/home/home", {
        isLanding: true
    });
}

function renderPageNotFound() {
    return HtmlService.createHtmlOutput(
        '<h1 style="color:red;">Page Not Found</h1>'
    );
}

function renderCreateTicket(){
    return render("views/createTicket/createTicket");
}


function sayJoyy(){
    return "Joyy";
}