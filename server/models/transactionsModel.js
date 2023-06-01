const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    _id: {  
        type: String,  //Our own generated id
        reqired: true
    },
    mode: {        
        type: String
    },
    amount: Number,
    bankTransactionId: String

})

module.exports = mongoose.model("transactions",transactionSchema);
