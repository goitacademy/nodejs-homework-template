// const ErrorMessages = {
//   400: "missing required name field",
//   401: "Unauthorized",
//   403: "Forbidden",
//   404: "Not found",
//   409: "Conflict",
// };
// const HttpError = (status, message = ErrorMessages[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

class HttpError extends Error {
  constructor(status, message) {
    super({ status, message });
    this.status = status;
    this.message = message;
  }
}

function newHttpError(status, message) {
  return new HttpError(status, message);
}

module.exports = newHttpError;
