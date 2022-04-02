
function getAllUsers() {
  const sheetValues = getSheetValues(db.tables.users.sheetName)
  return sheetValues;
}

function toUserObj(userArray) {
  return toClassObj(userArray, db.tables.users.columns);
}

function getUserByUserId(userId) {
  const users = getAllUsers();
  return toUserObj(users.find(user => user[0] == userId));
}

function getUserByEmail(emailID) {
  const users = getAllUsers();
  return users.find(user => user[1].trim().toLowerCase() == emailID.trim().toLowerCase());
}

function getUserRole(userId){
  return getUserByUserId(userId).role;
}

function getUserByRole(roleName) {
  const users = getAllUsers();
  //filter all with given role, return only emailId
  return users.filter(user => user[3].trim().toUpperCase() == roleName.trim().toUpperCase()).map((userArray) => userArray[0]);
}

function main() {
  console.log(getUserByUserId(1001))
  console.log(getUserRole(1001))
  console.log(getUserByEmail("riddhi.batas@searce.com"))
  console.log(toUserObj(getUserByEmail("riddhi.batas@searce.com")))
  console.log(getUserByRole("TECHNICIAN"))

}