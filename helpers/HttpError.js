const errorMessagesList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

const HttpError = (status, message = errorMessagesList[status]) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = HttpError;
