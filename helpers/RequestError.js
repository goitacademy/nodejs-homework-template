const messages = {
  400: 'Bed Request',
  401: 'Unauthrized',
  403: 'Forbbiden',
  404: 'Not found',
};

const RequestError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;

  return error;
};

module.exports = RequestError;
