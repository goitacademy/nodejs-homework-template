// const jwt = require('jsonwebtoken');
// const passport = require('passport'); 
const User = require("../service/schema/user");
const {getUserByEmail} = require("../service/user");
require('dotenv').config();
// const {Conflict} = require('http-errors');
const gravatar = require('gravatar');
// const secret = process.env.SECRET;
const emailService = require('../service/emailService');
const { nanoid } = require('nanoid');


const signupCtrl = async (req, res, next) => {
    const { username, email, password, subscription, token } = req.body;
    const user = await getUserByEmail(email);
  
    if (user) {
      return res.status(409).json({
        status: "Error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    try {
      const verificationToken = nanoid();

      const avatarURL = gravatar.url(email);
      const newUser = new User({ username, email, subscription, token, avatarURL, verificationToken });
      newUser.setPassword(password);
      newUser.verify = false;
      await newUser.save();

      emailService.sendMail(verificationToken, email);
      res.status(200).json({
        status: "Success",
        code: 201,
        data: {
          message: "Registration Successful",
          avatarUrl: avatarURL, 
        },
      });
    } catch (error) {
      next(error);
    }
  };

module.exports = signupCtrl;