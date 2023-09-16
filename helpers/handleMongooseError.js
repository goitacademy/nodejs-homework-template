/**
 * Middleware function to handle Mongoose database errors.
 *
 * @param {Error} error - The Mongoose error
 * @param {Object} data - Additional data related to the error (not used in this example)
 * @param {function} next - Next function to pass control to the next middleware
 */
const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  // Determine the HTTP status code based on the Mongoose error type and code
  error.status = name === 'MongoServerError' && code === 11000 ? 409 : 400;

  // Continue with the next middleware or route handler
  next();
};

module.exports = handleMongooseError;

// This middleware function, handleMongooseError, is used to handle Mongoose database errors that may occur during database operations. It checks the error type and code and sets an appropriate HTTP status code based on the error type. If the error is a MongoDB duplicate key error (error code 11000), it sets the status code to 409 (Conflict). For other types of errors, it sets the status code to 400 (Bad Request).

// This middleware allows you to handle common Mongoose database errors and respond with appropriate HTTP status codes in your Express application.
