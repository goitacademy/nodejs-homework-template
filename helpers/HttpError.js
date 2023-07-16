class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.status = statusCode;
  }
}

module.exports = HttpError;

// const HttpError = (status, message) => {
//   const err = new Error(message);
//   err.status = status;
//   return err;
// };
