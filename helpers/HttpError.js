const messages = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
}

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message)
  error.status = status;
  console.log(error);
  console.log(message);
  return error;
}

module.exports = HttpError;