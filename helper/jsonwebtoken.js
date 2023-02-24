const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const create = userid =>
  jwt.sign({ id: userid }, JWT_SECRET_KEY, { expiresIn: '2h' });
console.log('create:', create);

module.exports = {
  create,
};
