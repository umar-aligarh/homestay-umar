const router = require('express').Router();
const bookingsModel = require('../models/bookingsModel');
const roomsModel = require('../models/roomStatusModel');
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
    let selectedRooms = req.body.select;
    let checkIn = req.body.checkIn;
    let checkOut = req.body.checkOut;
    let numberOfBookings = await getAndUpdateNumberofBookings();

    console.log(numberOfBookings);
    let string1 = "";
    let string2 = numberOfBookings.toString();
    for(let i=1; i<=(5-string2.length); i++)string1+='0';
    let bookingId = string1+string2;
    const newBooking = new bookingsModel({
        _id:bookingId,accountId:'1234',
        roomsBooked: selectedRooms,
        checkIn: checkIn,
        checkOut: checkOut
    })
    await newBooking.save();

    for(let i=0;i<selectedRooms.length;i++)
    {
        let doc = await roomsModel.findById(selectedRooms[i]);
        doc.bookings.push({
            "bookingId": bookingId,
            "checkIn": checkIn,
            "checkOut": checkOut
        })
        const filter = { _id: selectedRooms[i] };
        const update = { "$set": {
        bookings: doc.bookings
        }
        }
        await roomsModel.findOneAndUpdate(filter, update);
    }
    res.send('done');

});

router.route('/info').post(async(req, res) => {
    console.log(req.body)
    let selectedRooms = req.body.selectedRooms
    let checkIn = req.body.checkIn
    let checkOut = req.body.checkOut
    console.log(checkIn)
    console.log(checkOut)
    let clash=0;
    for(let i=0;i<selectedRooms.length;i++)
    {
        let doc = await roomsModel.findById(selectedRooms[i]);
        
        let numberofActiveBookings = doc.bookings.length;
        for(let j=0;j<numberofActiveBookings;j++)
        {
            console.log(doc.bookings[j])
            if(!(checkOut<doc.bookings[j].checkIn||checkIn>doc.bookings[j].checkOut))
            {
                clash=1;
                break;
            }
        }
        if(clash==1)
        break;
    }
    if(clash==1)
    {
        console.log('clash present')
    }
    else
    {
        console.log('clash not present')
    }
});

module.exports = router;

