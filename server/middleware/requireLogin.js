const jwt = require('jsonwebtoken')
const { JWT_SEC } = require('../key')
const mongoose = require("mongoose");
const User = mongoose.model("User");


module.exports = (req, res, next) => {

    const { authorization } = req.headers
    //  authorization === beaear erffcvctrcvgb57vgc
    if (!authorization) {
        return res.status(401).json({ error: "u must loged in" })

    }
    const token = authorization.replace("Bearer ", "")
    jwt.verify(token, JWT_SEC, (err, payload) => {
        if (err) {
            return res.status(401).json({ err: "u have must loged in" })
        }
        const { _id } = payload
        User.findById({ _id })
            //User.findOne({email:email})
            .then((userdata) => {
                req.user = userdata
                next()
            })

    })
}