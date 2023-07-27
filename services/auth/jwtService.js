const jwt = require('jsonwebtoken');
const { AppError } = require('../../utils');

/**
 * JWT sign service method.
 * @param {string} id - user ID
 * @returns {string} - jwt
 */
exports.signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * Validate JWT method.
 * @param {String} token - jwt
 * @returns {String} - user id
 */
exports.checkToken = (token) => {
  if (!token) throw new AppError(401, 'Not logged in..');

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    return id;
  } catch (err) {
    console.log(err.message);

    throw new AppError(401, 'Not logged in..');
  }
};
