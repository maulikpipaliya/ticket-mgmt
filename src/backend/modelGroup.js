function modelGroupMain(){
  // console.log(getAllGroupUsers())
  // console.log(getGroupUsers("GROUP_IT"))

  // console.log(getGroupUsers('GROUP_IT').map((user)=> getUserByUserId(user)));
  // console.log(getAllGroupUsers())
  console.log(getGroupOfUser(1001))
}


function getGroupOfUser(userId){
  const allGroupUsers = getAllGroupUsers();
  for (const [key, value] of Object.entries(allGroupUsers)) {
    if(value.includes(userId)) return key;
  }
  return false
}

/**
 * Returns the users of particular group
 * getGroupUsers("GROUP_IT")
 */
function getGroupUsers(groupName){
  const allGroupUsers = getAllGroupUsers()[groupName];
  return allGroupUsers || false
}

/**
 * Returns all groups and users in object
 */
function getAllGroupUsers() {
  const groupValues = getSheetValues("group_users")
  const groupValuesObj = {};

  //removing header row
  // const headers = 
  groupValues.shift();

  groupValues.forEach((item)=>{
    let gId = item[0].trim();
    let uId = item[1];
    
    if(!(gId in groupValuesObj)) groupValuesObj[gId] = [uId];
    else groupValuesObj[gId].push(uId);
  })
  return groupValuesObj || false;
}

/**
 * Returns userIds of users who are in specific group and has specific role.
 * getUsersInGroupByRole("GROUP_IT", "TECHNICIAN")
 */
function getUsersInGroupByRole(groupId, roleName){
  const values= getSheetValues(db.tables.groups.sheetName)
  console.log(values)
  const group = values.find((g) => g[0].trim().toUpperCase() == groupId.trim().toUpperCase())
  if(group){
    const technicianUserIds = getGroupUsers(groupId).filter((userId)=> getUserRole(userId) === roleName)
    return technicianUserIds;
  }

  return []
}