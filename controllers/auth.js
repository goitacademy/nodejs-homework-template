const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const {SECRET_KEY} = process.env;

const register = async(req, res, next)=>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(409).json({ message: "Email in use" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({...req.body, password: hashPassword});

        res.status(201).json({
            email: newUser.email,
            subscription: newUser.subscription,
        })
    }
    catch(error){
        next(error);
    }

}

const login = async(req, res, next) => {
const {email, password} = req.body;
const user = await User.findOne({email});
if(!user) {
    return res.status(401).json({ message: "Email or password is wrong" });
}
const passwordCompare = await bcrypt.compare(password, user.password);
if(!passwordCompare){
    return res.status(401).json({ message: "Email or password is wrong" });
}

const payload = {
    id: user._id,

}
const token = jwt.sign(payload, SECRET_KEY, {expiresIn:"23h"});
res.json({
    token,
})
}
module.exports={
    register,
    login,
}