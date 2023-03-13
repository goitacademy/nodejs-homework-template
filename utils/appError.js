/**
 * Class extends Error.
 * Add HTTP status code.
 */
class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = AppError;