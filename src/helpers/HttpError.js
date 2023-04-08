class HttpError extends Error {
  constructor(status, message = errorMessages[status]) {
    super(message);
    this.status = status;
  }
}

const errorMessages = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

module.exports = HttpError;
