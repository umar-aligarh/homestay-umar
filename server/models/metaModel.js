const mongoose = require("mongoose");
mongoose.pluralize(null);


const metaSchema = new mongoose.Schema({

    numberofBookings: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("meta",metaSchema);