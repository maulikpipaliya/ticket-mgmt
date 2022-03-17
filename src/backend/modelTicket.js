function getAllTickets() {
    return getSheetValues(db.tables.tickets.sheetName);
}

function getTicketById(ticketId) {
    const tickets = getAllTickets();
    const db = getDBSchema();

    const ticketColumns = db.tables.tickets.columns;
    const ticketFound = tickets.find(
        (ticket) =>
            ticket[0].trim().toUpperCase() == ticketId.trim().toUpperCase()
    );

    if (ticketFound) {
        const ticket = {};
        ticketColumns.forEach((column, idx) => {
            ticket[column] = ticketFound[idx];
        });

        return ticket;
    }
    return null
}

function getTicketsByRequester(requesterEmail) {
    const tickets = getAllTickets();
    return tickets.find(
        (ticket) =>
            ticket[1].trim().toLowerCase() ==
            requesterEmail.trim().toLowerCase()
    );
}

function mainTickets() {
  const toList = getTechnicians("GROUP_IT")
  console.log(toList)
  sendMail(toList, []);
}

function getTechnicians(groupId){
  const values= getSheetValues(db.tables.groups.sheetName)
  const group = values.find( (g) => 
    g[0].trim().toUpperCase() == groupId.trim().toUpperCase()
  )
  if(group){
    const groupEmails = group[2].split(',').map(e=>e.trim())
    if(groupEmails.length > 0) return groupEmails;
  }

  return []
}