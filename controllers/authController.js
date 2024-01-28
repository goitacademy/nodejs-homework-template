const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendVerificationEmail = (user, verificationToken) => {

};

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'Email already in use' });
    }
    user = new User({ email, password });
    await user.save();

    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await user.generateAuthToken();
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    const verificationToken = uuidv4(); 
  newUser.verificationToken = verificationToken;
  await newUser.save();
    res.status(201).json({ /* ... дані користувача ... */ });


  sendVerificationEmail(newUser, verificationToken);
};

module.exports = {
  register,
  login
};

