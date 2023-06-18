let selectedCategoriesGlobal = {};
function checkBookingClash(myObject){
    const checkIn = document.getElementById('checkIn')
    const checkOut = document.getElementById('checkOut')
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
        htmltoInsert+=`<label>${categoryName}</label><select onchange="calculateAmount(this)"><option name="${categoryName}" value="0">0</option>`;
        for(let i=1;i<=maxAvailable;i++)
        {
          htmltoInsert+=`<option name="${categoryName}" value="${i}">${i}</option>`
        }
        htmltoInsert+=`</select><br>`;
      }
      document.getElementById('availibility-info').innerHTML = htmltoInsert;
    });
  });
}

function calculateAmount(selectedCategory)
{
  let categoryName = selectedCategory[0].attributes.name.textContent
  let categoryQty = selectedCategory.options.selectedIndex;
  selectedCategoriesGlobal[categoryName] = categoryQty;

  fetch("http://localhost:3000/bookings/totalamount", {
  method: "POST",
  body: JSON.stringify(selectedCategoriesGlobal),
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }
})
  .then((response) =>
  {
    response.json()
    .then((totalAmountObj)=>{
      console.log(totalAmountObj);
      let htmltoInsert=`<p>amount: ₹${totalAmountObj.totalAmount}</p>`;
      document.getElementById('amount').innerHTML = htmltoInsert;
    });
  });
  // console.log(selectedCategory)
}
