const { User } = require("../models/user");
const { httpError, ctrlWrapper } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {SECRET_KEY} = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});

  if(user){
      throw httpError(409, "Email in use");
  }

  const hashPassword =  await bcrypt.hash(password, 10);

  const newUser = await User.create({...req.body, password: hashPassword});

  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user) {
        throw httpError(401, "Email or password is wrong")
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw httpError(401, "Email or password is wrong")
    }
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"} );
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
        token,

    })
}

const getCurrent = async (req, res) => {
  const {email, name} = req.user;
  res.json({
    email,
    name,
  })
}

const logout =async (req, res) => {
  const {_id} = req.user;
  console.log('_id', _id)
  await User.findByIdAndUpdate(_id, {token: null});

  res.status(204).json();
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
