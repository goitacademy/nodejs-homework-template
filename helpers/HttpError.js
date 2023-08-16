// const HttpError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };
class HttpError {
  constructor(status, message) {
    this.message = message;
    this.status = status;
  }
}

module.exports = { HttpError };
