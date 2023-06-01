const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    roomsBooked: {
        type: [Number]
    }

})

module.exports = mongoose.model("booking",bookingSchema);