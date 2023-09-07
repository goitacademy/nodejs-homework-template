class HttpError extends Error {
  constructor(status, message) {
    super(message);
    (this.status = status), // (1)
      (this.name = "HttpError"); // (2)
  }
}

// const HttpError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

module.exports = HttpError;
