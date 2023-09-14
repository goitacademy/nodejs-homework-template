const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.SECRET;

const createToken = payload => jwt.sign(payload, secret, { expiresIn: '1h' });

module.exports = { createToken };