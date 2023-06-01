const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({

    _id: {  
        type: String,  //mob no. is of 10 digits so no int
        reqired: true
    },
    bookings:{        //bookings from this account(Booking-IDs)
        type: [String]
    }
})

module.exports = mongoose.model("accounts",accountSchema);
