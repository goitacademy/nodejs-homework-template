const asyncMiddleware = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    console.error(error.message);
    next(new Error('Internal server error'));
  }
};

const HTTPError = (status, message) => {
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

module.exports = {
  asyncMiddleware,
  HTTPError,
};
