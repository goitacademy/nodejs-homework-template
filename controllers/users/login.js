const {Unauthorized} = require("http-errors")
const {User} = require('../../models')
const jwt = require('jsonwebtoken')


const {SECRET_KEY} = process.env;

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    
    if(!user || !user.comparePassword(password)){
        throw new Unauthorized("Email or password is wrong")
    }

    const payload = {
            id: user._id
          }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "1h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.status(200).json({
        "token": token,
        "user": {
        "email": email,
        "subscription": user.subscription
    }})
}

module.exports = login