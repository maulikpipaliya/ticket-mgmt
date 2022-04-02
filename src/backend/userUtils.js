function getActiveUser(){
    var user = Session.getActiveUser();
    return user ? user.getEmail() : false;
}

function getActiveUserInfo(){
    const ss = SpreadsheetApp.openById(db.fileId); 
    const ws = ss.getSheetByName(db.tables.users.sheetName);
    const data = ws.getRange(1,1, ws.getLastRow(), ws.getLastColumn()).getValues();

    const allUsers = valuesToObject(data, true);
    const activeUser = allUsers.find(user => user.email === getActiveUser());

    return activeUser || false;

}

function mainUsers(){
  console.log(getActiveUserInfo());
}
