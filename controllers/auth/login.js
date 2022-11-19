const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const {User}= require("../../models/users");

const {RequestError}= require("../../helpers")

const {SECRET_KEY}= process.env;

const login = async(req, res)=>{
    const {email, password}=req.body;
    const user = await User.findOne({email});
    if (!user){
        throw RequestError(401, "Email not found")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        throw RequestError (401, "Email or password is wrong")
    }
     const paylod = {
        id: user.id
     }
    const token = jwt.sign(paylod, SECRET_KEY, {expireIN: "1h"});
    await User.findByIdAndUpdate(user._id, {token})
    res.json({token,})
}

module.exports = login;