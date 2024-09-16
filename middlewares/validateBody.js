const { HttpError } = require('../helpers');

/**
 * Middleware function to validate the request body using a schema.
 *
 * @param {Joi.Schema} schema - Joi schema for request body validation
 * @returns {function} Middleware function to validate the request body
 */
const validateBody = (schema) => {
  return (req, res, next) => {
    // Validate the request body using the provided schema
    const { error } = schema.validate(req.body);

    // If validation fails, send a 400 Bad Request response with the validation error message
    if (error) {
      console.log(error.details[0]);
      next(new HttpError(400, error.details[0].message));
    }

    // Continue with the next middleware or route handler if validation succeeds
    next();
  };
};

module.exports = validateBody;

// This middleware function is used for validating the request body using a Joi schema. It checks the request body against the provided schema and sends a 400 Bad Request response with the validation error message if the validation fails. If validation succeeds, it allows the request to continue to the next middleware or route handler.
