class HttpError extends Error {
  constructor(status, message = errorMessages[status]) {
    super(message);
    this.status = status;
  }
}

const errorMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

module.exports = HttpError;

// const HttpError = (status, message = errorMessages[status]) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

// module.exports = HttpError;
