const STATUSES = {
  401: 'not authorized',
  404: 'not found',
};

const createError = (status, message = STATUSES[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { createError };
