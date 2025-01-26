const Joi = require('joi');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.signup = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email in use' });
    }

    const user = new User({ email, password });
    const token = user.generateAuthToken(); 
    user.token = token;
    await user.save();

    res.status(201).json({
      user: { email: user.email, subscription: user.subscription },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Email or password is wrong' });
    }

    const token = user.generateAuthToken();
    console.log("Generated Token:", token);
    res.status(200).json({
      token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCurrent = async (req, res) => {
  try {
    const user = req.user;
    console.log('User Found:', user);
    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};