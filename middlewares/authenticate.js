/**
 * 1. get auth title from req.headers
 * 2. split to two pices authorization
 * 3. if the first num word !== "Bearer" error 401
 * 4. check token(second part) to valid or not
 * find on base user by id
 */

/**
 * for Decryption token
 */
//  const express = require('express');
const jwt = require('jsonwebtoken');
const { RequestError } = require('../helpers');

const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = '' } = req.headers;
    const [bearer = '', token = ''] = authorization.split(' ');

    if (bearer !== 'Bearer') {
      throw RequestError(401, 'Not authorized');
    }

    try {
      const { _id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(_id);
      if (!user) {
        throw RequestError('Not authorized');
      }
      req.user = user;
      next();
    } catch (error) {
      next(RequestError(401));
    }
  } catch (error) {
    next(RequestError(401));
  }
};

module.exports = authenticate;
