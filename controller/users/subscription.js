const service = require('../../services');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const subscription = async (req, res) => {
  const { id } = req.user;
  const { subscription } = req.body;
  try {
    const {
      _id,
      email,
      subscription: newSub,
    } = await service.updateSubscription({ id, subscription });
    res.status(200).json({ _id, email, subscription: newSub });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = subscription;
