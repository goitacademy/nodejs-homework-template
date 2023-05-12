class HttpError {
  constructor(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
  }
}

// (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };
module.exports = HttpError;
