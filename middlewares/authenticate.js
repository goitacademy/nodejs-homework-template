const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');
const User = require('../models/user');

const { SECRET_KEY } = process.env;

/**
 * Middleware function to authenticate user requests using JWT token.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 * @throws {HttpError} 401 if authentication fails
 */
const authenticate = async (req, res, next) => {
  // Extract the authorization header
  const { authorization = '' } = req.headers;

  // Split the header into 'Bearer' and the token
  const [bearer, token] = authorization.split(' ');

  // Check if the authorization header is valid
  if (bearer !== 'Bearer' || !token) {
    next(new HttpError(401));
  }
  try {
    // Verify the JWT token and extract the user's ID
    const { id } = jwt.verify(token, SECRET_KEY);

    // Find the user by ID
    const user = await User.findById(id);

    // Check if the user or token doesn't exist or doesn't match
    if (!user || !user.token || user.token !== token) {
      next(new HttpError(401));
    }

    // Set the authenticated user in the request object
    req.user = user;

    // Continue with the next middleware
    next();
  } catch {
    // Handle authentication errors and send an appropriate response
    next(new HttpError(401));
  }
};

module.exports = authenticate;

// This middleware function is used for user authentication using JSON Web Tokens (JWT). It checks the authorization header of incoming requests for a valid JWT token, verifies it, and ensures that the user associated with the token exists and matches the token stored in the database. If authentication fails, it sends a 401 Unauthorized response. If authentication succeeds, it sets the authenticated user in the request object (req.user) and allows the request to continue to the next middleware or route handler.
