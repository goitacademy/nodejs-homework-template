const {User} = require('../models/user');
const HttpError = require('../helpers/HttpError');
const {ctrlWrapper} = require('../helpers/ctrWrapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {SECRET_KEY} = process.env;

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({...req.body, password:hashPassword});
    res.status(201).json(
     {
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
     });
}

const login = async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email});
   if(!user){
       throw HttpError(401, "Email or password is wrong");
}
const passwordCompare = await bcrypt.compare(password, user.password);
  
if(!passwordCompare){
    throw HttpError (401, "Email or password is wrong");
}

const payload = {
    id: user._id,
}
const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
await User.findByIdAndUpdate(user._id, {token});
res.json({
        token,
        user: {
          email:user.email,
          subscription:user.subscription
        }
})
}

const getCurrent = async (req, res, next) =>{
        const user = req.user;
        const {token}  = req.params;
        if (user.token !== token) {
            throw HttpError(401, "Not authorized");
        }

        res.json({
            email: user.email,
            subscription: user.subscription
        })
   
}

// const logout = async (req, res, _next) => {
//     const userId = req.user.id;
//     await User.updateToken(userId, null);
//     return res.status(HttpCode.NO_CONTENT).json();
//   };

const logout = async (req, res) => {
    const{id} = req.user;
   await User.findByIdAndUpdate(id, {token:" "});
     
    res.status(204).json(
        {message: 'Logout success'}
    )
}

const subscription = async (req, res) =>{
    const{id} = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
     throw HttpError(400);
    }
    res.json(result);
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription),
}