const { User } = require('../models/user');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const { SECRET_KEY } = process.env;

const generateAndSaveUserToken = async (user) => {
  const payload = {
    id: user._id.toString(),
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(user._id, { token });

  return token;
};

module.exports = generateAndSaveUserToken;
