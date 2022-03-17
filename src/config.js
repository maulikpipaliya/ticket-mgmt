const routes = {
    common: {
        js: "views/commonJS",
        css: "views/commonCSS",
    },
    home: {
        html: "views/HomeScreen/home",
        js: "views/HomeScreen/homeJS",
        css: "views/HomeScreen/homeCSS",
    },
    landing: {
        html: "views/Landing/LandingHTML",
        js: "views/Landing/LandingJS",
        css: "views/Landing/LandingCSS",
    },
};

const db = {
    fileId: "1n66CRzw1U2StCKpoKH7XhoVyapyKzuRNDOTnxFy3Emg",
    tables: {
        users: {
            sheetName: "users",
            columns: ["email", "fullName", "role", "createdAt", "updatedAt"],
        },
        tickets: {
            sheetName: "tickets",
            columns: [
                "ticketId",
                "requestedBy",
                "ticketType",
                "group",
                "assignedTo",
                "status",
                "priority",
                "subject",
                "description",
                "closedAt",
                "dueAt",
                "createdAt",
                "updatedAt",
                "deleted",
            ],
        },
        groups: {
          sheetName: "groups",
          columns : ["groupId", "name", "users"]
        }
    },
};


const dbConfig = "HahahLol"

function haha(){
  console.log("hello")
}