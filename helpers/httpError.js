const httpError = (status, message) => {
    const defaultMessage = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
  };
  const error = new Error(message || defaultMessage[status]);
  error.status = status;
  return error;
};


module.exports = httpError;