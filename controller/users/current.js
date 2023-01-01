const service = require('../../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const current = async (req, res) => {
  const { email, subscription } = req.user;
  try {
    res.status(200).json({ email, subscription });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = current;
