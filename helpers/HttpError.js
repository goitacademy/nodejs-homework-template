const messagesList = {
  400: 'missing field',
  404: 'Not Found',
};

const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
