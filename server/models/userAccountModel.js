const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("account",accountSchema);