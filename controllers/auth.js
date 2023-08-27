const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

require('dotenv').config();
const {SECRET_KEY} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;  
  const user = await User.findOne({ email }); //первіряємо унікальність email
  console.log("email:", email);
  console.log("user:", user);
  if (user){
    throw HttpError(409, "Email already in use");
  }
  // const salt = await bcrypt.genSalt(10);
  // console.log(salt); //кількість "солі" - рівень складності хешування (10 - default) 
  // const hashPassword = await bcrypt.hash(password, salt);
  const hashPassword = await bcrypt.hash(password, 10); //хешування password
  // console.log(hashPassword);
  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email);
  const user = await User.findOne({ email });
  if(!user){
    throw HttpError(401, "Email invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare) {
    throw HttpError(401, "Password invalid");
  }
  // створюємо token
  const payload = {
    id: user._id,
  }
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"}); //{expiresIn: "23h"} - час можливості використання
  console.log(token);
  // const decodeToken = jwt.decode(token);
  res.json({
    token,
  })
};

const getCurrent = async (req, res) => {
  const {email, name} = req.user;

  res.json({
      email,
      name,
  })
};

const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: ""});

  res.json({
      message: "Logout success"
  })                                                                                                                      
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};