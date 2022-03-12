function getActiveUser(){
    var user = Session.getActiveUser();
    if(user){
        return user.getEmail();
    }
    return null;
}

function getActiveUserInfo(){
    const ss = SpreadsheetApp.openById(db.fileId); 
    const ws = ss.getSheetByName(db.tables.users.sheetName);
    const data = ws.getRange(1,1, ws.getLastRow(), ws.getLastColumn()).getValues();

    console.log(data);

    const allUsers = valuesToObject(data, true);
    const activeUser = allUsers.find(user => user.email === getActiveUser());

    return activeUser;

}
