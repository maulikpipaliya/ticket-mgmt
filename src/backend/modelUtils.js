/**
 * 
 */

function toClassObj(srcArray, idealColumnNames) {
  const classObj = {};
  const classColumns = idealColumnNames;

  if (srcArray.length === idealColumnNames.length) {
    classColumns.forEach((columnName, idx) => {
      classObj[columnName] = srcArray[idx]
    })
    return classObj;
  }
  return false;
}

function toClassArray(classObj) {
  return Object.values(classObj);
}


function testlal(){
  console.log(toClassArray({'id': 1, 'name': 'mualik'}))
}