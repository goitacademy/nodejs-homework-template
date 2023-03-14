const Joi = require('joi');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

async function register(req, res) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
  });

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      subscription: 'starter',
    });

    await newUser.save();

    return res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription } });
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }
}

module.exports = {
  register,
};
