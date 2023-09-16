const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

/**
 * Middleware function to validate if a given ID is a valid MongoDB ObjectId.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 */
const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  // Check if the provided ID is a valid MongoDB ObjectId
  if (!isValidObjectId(contactId)) {
    next(new HttpError(400, `${contactId} is not valid id`));
  }

  // Continue with the next middleware or route handler if the ID is valid
  next();
};

module.exports = isValidId;

// This middleware function is used to validate whether a given ID is a valid MongoDB ObjectId. It checks if the provided ID is valid and sends a 400 Bad Request response with an error message if the validation fails. If the ID is valid, it allows the request to continue to the next middleware or route handler.
