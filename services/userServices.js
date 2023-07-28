const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const {User} = require("../models/user");

const HttpError = require("../utils/HttpError");
const ctrlWrapper = require("../utils/ctrlWrapper");
require('dotenv').config();

const {SECRET_KEY} = process.env;


const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashedPassword });

  res.status(201).json({ 
    email: newUser.email,
    password: newUser.password });
};

const login = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!user || !comparedPassword) {
        throw HttpError(401, "Email or password is wrong");
      };

      const payload = {
        id: user._id
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});

      res.json({
        token
      })
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
