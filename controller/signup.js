const jwt = require('jsonwebtoken');
const passport = require('passport'); 
const User = require("../service/schema/user");
const {getUserByEmail} = require("../service/user");
require('dotenv').config();
const secret = process.env.SECRET;

const signupCtrl = async (req, res, next) => {
    const { username, email, password } = req.body;
    const user = await getUserByEmail(email);
  
    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email is already in use",
        data: "Confilct",
      });
    }
    try {
      const newUser = new User({ username, email });
      newUser.setPassword(password);
      await newUser.save();
      res.status(201).json({
        status: "Success",
        code: 201,
        data: {
          message: "Registration Successful",
        },
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = signupCtrl;