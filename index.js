const express = require("express");
const mongoose = require('mongoose');
const app = express();



mongoose.connect('mongodb+srv://umar:<password>@cluster0.a3ow0gu.mongodb.net/?retryWrites=true&w=majority')
.then(
    ()=>{
        console.log('database connected');
    },
    (err)=>{
        console.log('database connection error:',err)
    }

);


const usersRouter = require('./server/routes/userRoutes');
const bookingsRouter = require('./server/routes/bookingRoutes');
const roomsRouter = require('./server/routes/roomRoutes');
const transactionsRouter = require('./server/routes/transactionRoutes');

app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/transactions', transactionsRouter);

//ddd
app.listen(3000,()=>{
    console.log("server running")
})