const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const User = require('../models/User');

const {JWT_SECRET} = process.env;

const checkToken = async (req, res, next) => {
  const {authorization} = req.headers;
  const [bearer, token] = authorization.split(' ');
  console.log(bearer)
  console.log(jwt.decode(token, JWT_SECRET))
  
};

module.exports = checkToken;
