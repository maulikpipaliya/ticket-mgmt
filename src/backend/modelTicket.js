function getAllTickets() {
  const sheetValues = getSheetValues(db.tables.tickets.sheetName);

  //remove header row
  sheetValues.shift();

  const allTickets = sheetValues.map((row) => toClassObj(row, db.tables.tickets.columns));
  return allTickets;
}

function getTicketById(ticketId) {
  const tickets = getAllTickets();
  const ticketFound = tickets.find((ticket) => ticket['ticketId'] === ticketId);
  return ticketFound || false;
}

function getTicketStatus(ticketId){
  const ticket = getTicketById(ticketId);
  if(ticket) {
    return ticket['status'];
  }
}

function getTicketsByRequester(requestedBy) {
  const tickets = getAllTickets();
  return tickets.filter(
    (ticket) =>
      ticket['requestedBy'].trim().toLowerCase() ==
      requestedBy.trim().toLowerCase()
  );
}

function getTicketsByGroup(groupId) {
  const tickets = getAllTickets();
  return tickets.filter((ticket) => ticket['group'] === groupId);
}

function displayAllTicketsServerSide(allTickets) {
  console.log("Displaying all tickets");
  console.log(allTickets)
  const scriptURL = getScriptURL();

  return getHTMLTableBodyForTickets(allTickets);
}

function getHTMLTableBodyForTickets(tickets){
  const scriptURL = getScriptURL();
  let htmlBody = '';
  tickets.forEach((ticket) => {
    const rowBody = `
         <tr>
            <th scope="row">
              <a href="${scriptURL}?path=viewTicket&ticketId=${ticket['ticketId']}">${ticket['ticketId']}</a>
            </th>
            <td><a href="${scriptURL}?path=viewTicket&ticketId=${ticket['ticketId']}">
                ${ticket['subject']}
              </a></td>
            <td>${ticket['assignedTo']}</td>
            <td>
              <span class="badge bg-warning">${ticket['priority']}</span>
            </td>
            <td>
              <span class="badge rounded-pill bg-light text-dark">${ticket['status']}</span>
            </td>
            <td> ${new Date(JSON.parse(ticket['createdAt'])).toLocaleString('en-GB')}</td>
          </tr>
      `;

    htmlBody += rowBody;
  });
  return htmlBody;
}

function updateTicket(ticketId, ticketObj){
  const ticketExists = getTicketById(ticketId);
  if(ticketExists){
    let newTicketObj = toClassArray(ticketObj);

    const ticketSheet = getSheet('tickets')
    const lastRow = ticketSheet.getLastRow();
    
    for(let i=2; i< lastRow; i++){
       if(ticketSheet.getRange(i, 1).getValue() == ticketId){
         ticketSheet.getRange(i, 1, 1, db.tables.tickets.columns.length).setValues([newTicketObj]);
       }
    }

  }
}

function resolveTicket(ticketId){
  const ticketExists = getTicketById(ticketId);
  if(ticketExists){
    ticketExists['status'] = "RESOLVED";
    let newTicketObj = toClassArray(ticketExists);
    updateTicket(ticketId, newTicketObj);
  }

  const mailToList = getUsersInGroupByRole('GROUP_IT', 'MANAGER').map((userId)=> getUserByUserId(userId).email).join(",");


    const htmlBody = `
    <h2>Below ticket has been marked RESOLVED </h2>
    <table>
        <tr>
            <td>Ticket ID</td>
            <td>${ticketId}</td>   
        </tr>
        <tr>
            <td>Status</td>
            <td>${ticketExists.status}</td>
        </tr>
        <tr>
            <td>Priority</td>
            <td>${ticketExists.priority}</td>    
        </tr>
        <tr>
            <td>Subject</td>
            <td>${ticketExists.subject}</td>
        </tr>
        <tr>
            <td>Description</td>
            <td>${ticketExists.description}</td>
        </tr>
        </table>
    `;

    MailApp.sendEmail({
        to: mailToList,
        subject: "FixIT | Review Ticket 🧺",
        htmlBody: htmlBody,
    });
}

function getAllTicketsForUser(){
  const tickets = getAllTickets();
  const activeUserEmail = getActiveUser();
  console.log(activeUserEmail)
  const allTicketsForUser = tickets.filter((ticket)=>{
    // console.log(ticket['requestedBy'])
    return ticket['requestedBy'] == activeUserEmail
  })
  console.log(getHTMLTableBodyForTickets(allTicketsForUser))
  return getHTMLTableBodyForTickets(allTicketsForUser)
}

function getRecentTicketsForUser(howManyTickets){
  const tickets = getAllTickets();
  const activeUserEmail = getActiveUser();
  console.log(activeUserEmail)
  const allTicketsForUser = tickets.filter((ticket)=>{
    // console.log(ticket['requestedBy'])
    return ticket['requestedBy'] == activeUserEmail
  })

  allTicketsForUser.sort((a, b)=>{
    return Date.parse(JSON.parse(b.createdAt)) -  Date.parse(JSON.parse(a.createdAt))
  })


  return allTicketsForUser.slice(0, howManyTickets);
}

function getTemplateRecentTicketsForUser(howManyTickets){
  const recentTickets = getRecentTicketsForUser(howManyTickets);
  let htmlBody = ``;
  recentTickets.forEach((ticket)=>{
    htmlBody += `
              <div class="fi-activity-item d-flex">
                  <a href="${getScriptURL() + '?path=viewTicket&ticketId=' + ticket.ticketId}" class="fi-activity-status p-2 px-4 m-2">${ticket.ticketId}</a>
                  <div class="fi-activity-content p-2 m-2">${ticket.subject}</div>
              </div>`
  })
  return htmlBody;
}


function getAllTicketsForTechnician(userId){
  const groupOfUser = getGroupOfUser(userId);
  if(groupOfUser){
    const groupTickets = getTicketsByGroup(groupOfUser);
    return getHTMLTableBodyForTickets(groupTickets)
  }
  return false
}

function getTemplateGroupUsers(groupId){
  const groupUsers = getUsersInGroupByRole(groupId, 'TECHNICIAN').map((userId)=> getUserByUserId(userId));
  
  let htmlBody = ``;
  groupUsers.forEach((user)=>{
    htmlBody += `<option value="${user['fullName']} ( ${user['email']} )">`
  })
  return htmlBody;
}



function mainTickets() {

  // let toList = getTechnicians("GROUP_IT") // gives array of UserIDs
  // toList = toList.map((userId)=>getUserByUserId(userId).email);
  // sendMail(toList, []);

  // console.log(getTicketById('INC978090'));
  // console.log(getTicketsByRequester('maulik.pipaliya@searce.com'));
  // console.log(getTicketsByGroup('GROUP_IT'));
  // console.log(updateTicket('SR124926', ['ticksk', 'haha']))
  // console.log(getTicketStatus('SR124926'))
  // console.log(getRecentTicketsForUser(1))
  // console.log(getAllTicketsForTechnician(1001))
  console.log(getTemplateGroupUsers('GROUP_IT'))
}

