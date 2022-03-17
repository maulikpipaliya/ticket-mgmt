
function getAllUsers() {  
  const sheetValues = getSheetValues(db.tables.users.sheetName)
  return sheetValues;
}

function getUserByEmail(emailID) {
  const users = getAllUsers();
  return users.find(user => user[0].trim().toLowerCase() == emailID.trim().toLowerCase());
}

function main(){
  console.log(getUserByEmail("maulik.pipaliya@searce.com"))
}