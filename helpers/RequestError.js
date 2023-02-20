const messages = {
  400: 'missing required name field',
  401: 'Unauthorized',
  403: 'Forbbiden',
  404: 'Not found',
  409: 'Conflict',
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;
