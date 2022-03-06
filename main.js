async function fetchData(page, pageSize){
   return await fetch(`https://www.anapioficeandfire.com/api/books?page=${page}&pageSize=${pageSize}`).then (function(response){
        return response.json()
    })
    

}

 async function addRow(data, tableRef) {
  let tbody = tableRef.getElementsByTagName('tbody')[0]

    // Insert a cell in the row at index 0
    for (let i=0; i<data.length; i++) {
      // Insert a row at the end of the table
      let newRow = tbody.insertRow(-1);
      
      for (let k=0; k < data[i].length; k++) {
          let cell = newRow.insertCell(k);
          let content = data[i][k]
          if (k==6){
            let characters = [];
            let promises = [];
            for (let c=0; c<5; c++) {
                promises.push(fetch(data[i][k][c]).then(async x => {
                    let res = await x.json();
                    characters.push(res.name);
                }));
            }
            await Promise.all(promises);
            content = listToString(characters);
            
          }
    
          cell.appendChild(document.createTextNode(content));
      }
    }
  }
  
  
  // Call addRow() with the table's ID
  function listToString(list) {
      let string = "";
      for (let i=0; i < list.length; i++) {
          string += list[i] + ", ";
      }
      return string;
  }
  
 async function main(page){
     let pageSize = 4
    let response =await fetchData(page, pageSize)
    console.log(response)

  let data = response.map(x => {
      return [x.name, x.isbn, x.numberOfPages, listToString(x.authors), x.publisher,x.released,x.characters] // Add characters later
  })
  console.log(data)
  let tableRef = document.getElementById("ice-fire-table");
  let rows = document.querySelectorAll('table tbody tr')
  for (let i=0; i<rows.length  ; i++){
      console.log("deleting row " + i)
    //tableRef.deleteRow(i)
    rows[i].remove()
    
} 
  await addRow(data, tableRef);   
  }
  main (1)
  



   
