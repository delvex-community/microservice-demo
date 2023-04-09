var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect(process.env.MONGO_URI,{  
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>{
    console.log("Connected to Database")

    const http = require('http');

    app.post("/auth/login",(req,res)=>{
        var email = req.body.email;
        var password = req.body.password;
        var  message = "";
        db.collection('users').findOne({"email": email}, (err, user) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            if (!user) {
        message="user not found"; 
                return  res.redirect(`/auth/login/?msg=${message}`); // Redirect to the destination URL with the message as a query parameter;
            }
            if (user.password === password) {
                console.log("right credentials");
            message=user.email;
                return res.redirect(`/success/?msg=${message}`);
            } else {
            
            message="wrong password"; 
                console.log("wrong credentials");
                return res.redirect(`/auth/login/?msg=${message}`);
            }
        });
    });

    // Use the ipAddress variable to redirect to the EC2 instance IP address
    app.post("/signup",(req,res)=>{
        var email = req.body.email;
        var mobile = req.body.mobile;
        var password = req.body.password;

        var data = {
            "email" : email,
            "mobile": mobile,
            "password" : password
        }

        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
        
        return res.redirect(`/auth/login`)
    })
    app.get("/",(req,res)=>{
        
        return res.redirect(`/`);
    }).listen(3000);


    console.log("Listening on PORT 3000");;
});


