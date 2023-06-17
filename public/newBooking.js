function myfunction(myObject){

    const checkIn = document.getElementById('checkIn')
    const checkOut = document.getElementById('checkOut')
    // console.log(checkIn.valueAsDate) 
    // console.log(checkOut.valueAsDate) 

    // let numberofRooms = myObject.length
    // const selectedRooms = [];
    // for(let i=0;i<numberofRooms;i++)//
    // {
    //     if(myObject[i].attributes.length==2)//if selected
    //     selectedRooms.push(myObject[i].attributes[0].value)
    // }
    // console.log(myObject)
    const objectSent={
        // "selectedRooms": selectedRooms,
        "checkIn": checkIn.valueAsDate,
        "checkOut": checkOut.valueAsDate
    }

  fetch("http://localhost:3000/bookings/info", {
  method: "POST",
  body: JSON.stringify(objectSent),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) =>
  {
    response.json()
    .then((availibilityInfo)=>{
      console.log(availibilityInfo);
      let htmltoInsert="";
      for(const categoryName in availibilityInfo)
      {
        let maxAvailable = availibilityInfo[categoryName];
        htmltoInsert+=`<label>${categoryName}</label><select><option value="0">0</option>`;
        for(let i=1;i<=maxAvailable;i++)
        {
          htmltoInsert+=`<option value="${i}">${i}</option>`
        }
        htmltoInsert+=`</select><br>`;
      }
      document.getElementById('availibility-info').innerHTML = htmltoInsert;
    });

  });
  
}
