const {User} = require("../models/user");

const {ctrlWrapper, HttpError} = require("../helpers");

const jwt = require("jsonwebtoken");

const {SECRET_KEY} = process.env;

const bcrypt = require("bcrypt");

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

if(user) {
    throw HttpError(409, "Email alredy in use")
  }
  const hashPassword = await bcrypt.hash(password,10)
  const newUser = await User.create({...req.body, password: hashPassword});
  
  res.status(201).json({
    email: newUser.email,
    password: newUser.password,
  })
}

const login = async(req, res)=> {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw HttpError(401, "Email or password invalid");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
    })
}

const getCurrent = async(req,res) => {
  const {email} = req.user;

  res.json({
    email
  })
}

const logout = async(req, res) => {
   const {_id} = req.user;
   await User.findByIdAndUpdate(_id, {token: ""});

   res.json({
    message: "Logout success",
   })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
}