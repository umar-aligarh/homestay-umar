const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();



mongoose.connect('mongodb+srv://umarkhan:ZrTH34t9PujHNWZa@cluster0.y1jtalv.mongodb.net/homestay?retryWrites=true&w=majority')
.then(
    ()=>{
        console.log('database connected');
    },
    (err)=>{
        console.log('database connection error:',err)
    }

);
mongoose.pluralize(null)

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(bodyParser.json())
app.use('/static', express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

const usersRouter = require('./server/routes/userRoutes');
const bookingsRouter = require('./server/routes/bookingRoutes');
const roomsRouter = require('./server/routes/roomRoutes');
const transactionsRouter = require('./server/routes/transactionRoutes');




app.use('/users', usersRouter);
app.use('/bookings', bookingsRouter);
app.use('/rooms', roomsRouter);
app.use('/transactions', transactionsRouter);



const port = process.env.PORT || 3000;
app.get("/",(req,res)=>{
     return res.render("home")
})

// app.post("/",(req,res)=>{
//     console.log(req.body.phone)
//     return res.redirect("/")
// })
// app.get("/",(req,res)=>{

//     return res.render('login')
// })

// app.get("/",(req,res)=>{
//     res.set({
//         "Allow-access-Allow-Origin": '*'
//     })
//     return res.redirect('home.html');
// })


  app.listen(port, () => console.log("Server started"));
