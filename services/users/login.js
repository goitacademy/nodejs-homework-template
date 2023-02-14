const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const isValidHash = async (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const getToken = async (_id) => {
  return await jwt.sign({ _id }, process.env.SECRET_KEY, {
    expiresIn: '15h',
  });
};

module.exports = { isValidHash, getToken };
