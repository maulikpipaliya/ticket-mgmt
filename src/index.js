/**
 * Home Screen
 */

function doGet(e) {
    Router.path("", renderHome);
    Router.path("/", renderHome);
    Router.path("home", renderHome);
    Router.path("createTicket", () => {
        return render("views/createTicket/createTicket", {
            page: "createTicket",
        });
    });
    Router.path("viewTicket", () => {   
        
        console.log("viewTicket");
        console.log("e.parameter.ticketId");
        console.log(e.parameter.ticketId)
        return render("views/viewTicket/viewTicket", {
            ticketId: e.parameter.ticketId,
        });
    });


    if (Router[e.parameter.path]) return Router[e.parameter.path]();
    else return renderPageNotFound();
}

function renderHome() {
    return render("views/home/home", {
        isLanding: true,
    });
}

function renderPageNotFound() {
    return HtmlService.createHtmlOutput(
        '<h1 style="color:red;">Page Not Found</h1>'
    );
}

function renderCreateTicket() {
    return render("views/createTicket/createTicket");
}
