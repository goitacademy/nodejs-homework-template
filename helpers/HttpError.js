const messages = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Client Error',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable entity',
  500: 'Internal server error',
  default: 'Something went wrong, please try again later...',
};

class HttpError extends Error {
  constructor(statusCode, message = messages[statusCode] || messages.default) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
