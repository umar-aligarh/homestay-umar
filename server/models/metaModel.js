const mongoose = require("mongoose");
mongoose.pluralize(null);


const metaSchema = new mongoose.Schema({

    NumberofBookings: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("meta",metaSchema);