class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };
module.exports = HttpError;
