const mongoose = require("mongoose");

const roomStatusSchema = new mongoose.Schema({

    _id: {  
        type: String,  //room number
        reqired: true
    },
    bookings: {        
        type: [{bookingId: String, checkIn: Date, checkOut: Date}]
    },
    capacity: Number  //(short form)
})

module.exports = mongoose.model("roomsStatus",roomStatusSchema);
