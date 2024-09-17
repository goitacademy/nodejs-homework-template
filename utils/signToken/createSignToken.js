const jwt = require('jsonwebtoken');

const createSignToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRES_IN,
});

module.exports = createSignToken;