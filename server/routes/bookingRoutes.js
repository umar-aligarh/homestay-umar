const router = require('express').Router();
const bookingsModel = require('../models/bookingsModel');
const meta = require('../models/metaModel');

// app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
// app.set('view engine', 'ejs');
// app.set('views',__dirname + '/views');

router.route('/new').get((req,res)=>{
    return res.render("newBooking")
})
router.route('/add').post(async(req, res) => {
    console.log(req.body.select)
    
    let numberOfBookings = await meta.getAndUpdateNumberofBookings;
    console.log(numberOfBookings);
    let string1 = "";
    let string2 = numberOfBookings.toString();
    for(let i=1; i<=(5-string2.length()); i++)string1+='0';
    let bookingId = string1+string2;
    const newBooking = new bookingsModel({_id:bookingId,accountId:'1234',roomsBooked:req.body.select})
    await newBooking.save();
    res.send('done');

});

module.exports = router;

