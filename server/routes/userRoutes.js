const router = require('express').Router();


const account = require('../models/userAccountsModel')
const path = require('path')
const alert = require('alert')





// router.set('view engine', 'ejs');
// router.set('views', path.join(__dirname, '..', 'views'));

router.route('/login').get((req,res)=>{
    res.render('login');
})

router.route('/isExisting').post(async (req, res) => {
    const phone = req.body.phone;
   const p = await account.exists({_id:phone})
    if(p)
    res.render('userHome')
    else 
    {
        const data = {
            phone : phone,
            condition :true
                      
        }
        res.render('signup',{data})
    }    
  
    // newUser.save()
    // .then(() => res.json('User added!'))
    // .catch(err => res.status(400).json('Error: ' + err));

});

router.route('/new').post(async (req,res)=>{
    const phone = req.body.phone 
    console.log(phone)
    const password = req.body.password
    const enteredOtp = req.body.otp
    let sentOtp = "1234"
    if( enteredOtp === sentOtp)
    {
         const newUser = new account({_id:phone,password:password})
         await newUser.save()
         res.render('userHome')
    }
    else 
    {
          alert(" wrong otp ")
    }
})

module.exports = router;