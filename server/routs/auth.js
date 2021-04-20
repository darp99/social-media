
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
 const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const {JWT_SEC} = require('../key')
const reuirelogin = require('../middleware/requireLogin')



// router.get("/pro",reuirelogin,(req,res)=>{
//   res.send("hello user")
// })


router.post("/signup", (req, res) => {
  const { name, email, password } = req.body

  if (!email || !password || !name) {
    return res.status(422).json({ error: "add all field" })
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "usr all ready exist" })
      } 
      
      bcrypt.hash(password, 10)
      .then(hashedpassword => {
         const user = new User({
           email: email,
           password: hashedpassword,
           name:name
        
          })

          user.save()
          .then(user => {
               res.json({ message: "successfuly saved" })
           })
            .catch(error => {
              console.log(error)
            })
        })
     
          }).catch(error => {
            console.log(error)
          })

        })



router.post("/signin",(req,res)=>{
   const {email,password}= req.body
   if(!email || !password) {
    return  res.status(422).json({error:"please add email or password"})
    } 

    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return  res.status(422).json({error:"invalid email or password"})

        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})

             const token =jwt.sign({_id:savedUser._id},JWT_SEC)
             const {_id,name,email} = savedUser
             res.json({token,user:{_id,name,email}})
              }
            else{
                return  res.status(422).json({error:"invalid email or password"})

            }

        })
        .catch(err=>{
            console.log(error)

        })
    })
    .catch(err=>{
      console.log(error)

  })

})

module.exports = router


//ERR_HTTP_HEADERS_SENT'