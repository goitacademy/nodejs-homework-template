const errorMessage = {
  400: 'Bad request',
  401: 'Email or password is wrong',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Email in use',
};

const HttpErrors = (status, message = errorMessage[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpErrors;
