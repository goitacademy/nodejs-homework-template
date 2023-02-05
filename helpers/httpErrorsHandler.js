const messages = {
  400: 'Bad Request',
  401: 'Email or password is wrong',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Email in use',
};

const httpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = httpError;
