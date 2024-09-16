const { httpErrorMessageList } = require('../variables');

/**
 * Custom HTTP error class that extends the JavaScript Error class.
 */
class HttpError extends Error {
  /**
   * Create a new HttpError instance.
   *
   * @param {number} status - HTTP status code for the error
   * @param {string} message - Optional error message
   */
  constructor(
    status = 500,
    message = httpErrorMessageList[status] || httpErrorMessageList.default
  ) {
    super(message);

    // Set the HTTP status code and error name
    this.status = status;
    this.name = 'HttpError';
  }
}

module.exports = HttpError;

// This code defines a custom HttpError class that extends the JavaScript Error class. It allows you to create instances of HTTP errors with a specified HTTP status code and an optional custom error message. The HttpError class sets the status code and error name accordingly and can be used to handle and propagate HTTP errors in your application.
