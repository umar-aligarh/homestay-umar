function myfunction(myObject){
    let optionsLength = myObject.length
    const selectedRooms = [];
    for(let i=0;i<optionsLength;i++)
    {
        if(myObject[i].attributes.length==2)
        selectedRooms.push(myObject[i].attributes[0].value)
    }
    // console.log(myObject)
    console.log(selectedRooms);


//     let user = {
//   name: 'John',
//   surname: 'Smith'
// };

  fetch("http://localhost:3000/bookings/info", {
  method: "POST",
  body: JSON.stringify(selectedRooms),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}