const bcrypt = require('bcryptjs');
const Joi = require('joi');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Validation error', details: error.details });
  }

  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new UserModel({
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET || 'domyslny_klucz',
      {
        expiresIn: '1h',
      }
    );

    res.status(201).json({
      token,
      user: {
        email: savedUser.email,
        subscription: savedUser.subscription || 'starter',
      },
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
};
