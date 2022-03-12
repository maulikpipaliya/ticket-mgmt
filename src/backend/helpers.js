function getFullName(firstName, lastName) {
    return camelCase(firstName) + " " + camelCase(lastName);
}

function camelCase(str) {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        });
}

/**
 * Takes values and outputs an array of objects
 * @param {values} array of array = data in range
 * @param {hasHeader} Boolean - whether data has header row or not
 */
 function valuesToObject(values, hasHeader) {
    let cid = 0;
  
    // fetch headers or if not avaiable, add manual ones.
    let headerColumns = hasHeader ? values[0] : values[0].map((r) => { return "column" + cid++ });
    headerColumns = headerColumns.map((c)=> camelCase(c))
    console.log(headerColumns)
    let numColumns = headerColumns.length;
    let numRows = values.length;
    let rowIndexStartsFrom = hasHeader ? 1 : 0;
  
    let data = [];
  
    for (let r = rowIndexStartsFrom; r < numRows; r++) {
      let rowObj = {};
      for (let c = 0; c < numColumns; c++)
        rowObj[headerColumns[c] + ''] = values[r][c];
  
      data.push(rowObj);
    }
  
    console.log(data)
    return data;
  }