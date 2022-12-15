const service = require('../../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const logout = async (req, res) => {
  const { id } = req.user;
  try {
    await service.updateUserToken({ id, token: '' });
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = logout;
