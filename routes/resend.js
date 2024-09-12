const express = require('express');
const router = express.Router();
const User = require('../models/users');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

router.post('/', async (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: 'Missing required field email' });
  }
  
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  if (user.verify) {
    return res.status(400).json({ message: 'Verification has already been passed' });
  }
  
  user.verificationToken = uuidv4();
  await user.save();
  
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: 'ilapalatov@gmail.com',
      pass: 'TwVU5b=%2d/,vwJRt',
    },
  });

  const mailOptions = {
    from: 'ilapalatov@gmail.com',
    to: user.email,
    subject: 'Email Verification',
    text: `Click the following link to verify your email: http://your-api-url/users/verify/${user.verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  
  return res.status(200).json({ message: 'Verification email sent' });
});

module.exports = router;
