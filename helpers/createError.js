const statusMessages = {
  400: 'missing required name filed',
  404: 'Not found',
  401: 'Unauthorised',
  409: 'Conflict',
  500: 'Server ERROR',
};

const createError = (status, message = statusMessages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = createError;