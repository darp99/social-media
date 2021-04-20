const { json } = require("express");
const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
//const {MONGOURI} = require('./key')


require("./models/user");
 require("./models/post");
 app.use(express.json())
 app.use(require("./routs/auth"))

mongoose.connect("mongodb://localhost:27017/instacolne",{
    useNewUrlParser:true,
    useCreateIndex :true,
    useUnifiedTopology:true
}).then(()=>{
    console.log(`connection done`);

}).catch((e)=>{

    console.log(`connection fail`);

});



 require("./models/user");
 require("./models/post");

app.use(express.json())
app.use(require("./routs/auth"))


app.use(require("./routs/post"))
app.use(require("./routs/user"))

app.listen(PORT,(req,res)=>{

    console.log(`sucessful port at ${PORT}`);
});