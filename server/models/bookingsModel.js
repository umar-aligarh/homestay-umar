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
    },
    checkIn: Date,
    checkOut: Date,
    isBookingCompelete: Boolean
})

module.exports = mongoose.model("booking",bookingSchema);