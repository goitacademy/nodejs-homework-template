const User = require('../models/user');
// const { HttpError } = require('../helpers');
// const ctrlWrapper = require('../middlewares/ctrlWrapper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw res.status(409).json({ message: 'Email in use' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({ email: newUser.email, name: newUser.name, password: newUser.password });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log(`!user. 401 error`);
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }
    const passwoedCompare = await bcrypt.compare(password, user.password);
    if (!passwoedCompare) {
      throw res.status(401).json({ message: 'Email or pass invalid' });
    }

    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};
module.exports = { register, login };
