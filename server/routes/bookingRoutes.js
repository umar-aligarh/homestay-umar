const router = require('express').Router();
const bookingsModel = require('../models/bookingsModel');
const metaModel = require('../models/metaModel');

// app.use(bodyParser.urlencoded({limit: '5000mMb', extended: true, parameterLimit: 100000000000}));
// app.set('view engine', 'ejs');
// app.set('views',__dirname + '/views');

router.route('/new').get((req,res)=>{
    return res.render("newBooking")
})
async function getAndUpdateNumberofBookings()
{
    let doc = await metaModel.findById('meta');
    console.log(doc);
    let numberOfBookings = doc.numberofBookings;
    numberOfBookings++;
    const filter = { _id: 'meta' };
    const update = { "$set": {
        "numberofBookings":numberOfBookings
    }}
    await metaModel.findOneAndUpdate(filter, update);
    return numberOfBookings;
}
router.route('/add').post(async(req, res) => {
    console.log(req.body.select)
    
    let numberOfBookings = await getAndUpdateNumberofBookings();

    console.log(numberOfBookings);
    let string1 = "";
    let string2 = numberOfBookings.toString();
    for(let i=1; i<=(5-string2.length); i++)string1+='0';
    let bookingId = string1+string2;
    const newBooking = new bookingsModel({
        _id:bookingId,accountId:'1234',
        roomsBooked: req.body.select,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut
    })
    await newBooking.save();
    res.send('done');

});

router.route('/info').post((req, res) => {

    console.log(req.body)
});

module.exports = router;

