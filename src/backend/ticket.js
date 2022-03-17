/**
 * 
 * @param {*} data 
 *      ticketId
        requestedBy
        ticketType
        group
        assignedTo
        status
        priority
        subject
        description
        closedAt
        dueAt
        createdAt
        updatedAt
        deleted
 * @returns 
 */

function createTicket(data) {
    console.log(data);

    const ss = SpreadsheetApp.openById(db.fileId);
    const sheet = ss.getSheetByName(db.tables.tickets.sheetName);

    if (!sheet) {
        console.log("sheet " + db.tables.tickets.sheetName + " not found");
        return;
    }

    const row = sheet.getLastRow() + 1;
    const col = 1;
    const range = sheet.getRange(row, col, 1, db.tables.tickets.columns.length);

    const {
        ticketId,
        requestedBy,
        ticketType,
        group,
        assignedTo,
        status,
        priority,
        subject,
        description,
        closedAt,
        dueAt,
        createdAt,
        updatedAt,
        deleted,
    } = data;

    const values = [
        ticketId,
        requestedBy,
        ticketType,
        group,
        assignedTo,
        status,
        priority,
        subject,
        description,
        closedAt,
        dueAt,
        createdAt,
        updatedAt,
        deleted,
    ];

    range.setValues([values]);

    return "success";
}

function getRandomTicketId(ticketType) {
    const min = 100000;
    const max = 999999;

    const getRandomNumber = () => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    switch (ticketType) {
        case "INCIDENT":
            return "INC" + getRandomNumber();
        case "FEATURE_REQUEST":
            return "FR" + getRandomNumber();
        case "INQUIRY":
            return "INQ" + getRandomNumber();
        case "SERVICE_REQUEST":
            return "SR" + getRandomNumber();
        default:
            return "TKT" + getRandomNumber();
    }
}