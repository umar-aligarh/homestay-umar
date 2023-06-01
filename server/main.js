const express = require("express");
const app = express();


const usersRouter = require('./routes/userRoutes');
const bookingsRouter = require('./routes/bookingRoutes');
const roomsRouter = require('./routes/roomRoutes');
const transactionsRouter = require('./routes/transactionRoutes');

app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/transactions', transactionsRouter);

//ddd
app.listen(3000,()=>{
    console.log("server running")
})