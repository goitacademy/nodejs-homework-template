import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';

import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILGUN_HOST,
  port: process.env.MAILGUN_PORT,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASS,
  },
});

import userModel from '../models/userModel.js';
import avatar from './avatar.js';


const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const router = express.Router();


router.use('/avatars', avatar);


router.post('/signup', async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword,
      subscription: 'starter',
      verificationToken: generateUniqueToken(),
    });


    if (newUser.verify) {
      return res
        .status(400)
        .json({ message: 'Verification has already been passed' });
    }

    const mailOptions = {
      from: process.env.MAILGUN_USER,
      to: email,
      subject: 'Verification Email',
      text: `Click the following link to verify your email: localhost:3000/users/verify/${newUser.verificationToken}`, //http://yourapi.com/users/verify/${user.verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Verification email sent' });

  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


function generateUniqueToken() {
  const token = uuidv4();
  return token;
}

export default router;
