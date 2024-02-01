import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'


const app = express();

app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));
app.use(bodyParser.json())
app.use(express.static('static'));
// app.set('view engine', 'ejs');
// app.set('/images', __dirname+'/static');

// app.use('/public', express.static('public'));

app.use(express.json())


let port = process.env.PORT||5000

app.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname,"static/index.html"));
})

// app.get("/images/about-img.jpg",(req,res)=>{
//     console.log('umar');
//     return res.sendFile(path.join(__dirname,"images/about-img.jpg"));
// })

app.listen(port, () => console.log("Server started"));
