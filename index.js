const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const ejs = require('ejs')



const app = express();

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(bodyParser.json())
app.use(express.static('views/static'));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');
// app.set('/images', __dirname+'/static');

// app.use('/public', express.static('public'));

app.use(express.json())


let port = process.env.PORT||5000


app.get("/",(req,res)=>{
    let price1,price2;
    const filePath = './price.json';
    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    let jsonData = JSON.parse(data);
    price0=jsonData.price[0];    
    price1=jsonData.price[1];   
    return res.render("static/index",{p1:price0,p2:price1}); 
    });
    
})
app.get("/changeprice",(req,res)=>{
    return res.sendFile(__dirname +'/views/static/changeprice.html');
})
app.get("/changepriceclick",(req,res)=>{
    newprice=req.query.p
    const filePath = './price.json';    
    fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    let jsonData = JSON.parse(data);
    jsonData.price[req.query.cat]=newprice   
    console.log(jsonData.price[req.query.cat]) 
    const updatedJsonData = JSON.stringify(jsonData, null, 2);
    fs.writeFile(filePath, updatedJsonData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing the file:', err);
            return;
        }

        console.log('JSON file has been updated successfully.');
    });
});

})

// app.get("/images/about-img.jpg",(req,res)=>{
//     console.log('umar');
//     return res.sendFile(path.join(__dirname,"images/about-img.jpg"));
// })

app.listen(port, () => console.log("Server started"));
