function myfunction(myObject){
    console.log(myObject)
    const checkIn = document.getElementById('checkIn')
    const checkOut = document.getElementById('checkOut')
    console.log(checkIn);
    let numberofRooms = myObject.length
    const selectedRooms = [];
    for(let i=0;i<numberofRooms;i++)
    {
        if(myObject[i].attributes.length==2)
        selectedRooms.push(myObject[i].attributes[0].value)
    }
    // console.log(myObject)
    console.log(selectedRooms);
    const objectSent={
        "selectedRooms": selectedRooms,
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
  .then((response) => response.json())
  .then((json) => console.log(json));
}