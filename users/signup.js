import express from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
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
    });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
    
      },
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
