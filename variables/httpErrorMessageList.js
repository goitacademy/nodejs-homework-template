const httpErrorMessageList = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Not authorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
  422: 'Unprocessable entity',
  500: 'Internal server error',
  default: 'Something went wrong, please try again later...',
};

module.exports = httpErrorMessageList;
