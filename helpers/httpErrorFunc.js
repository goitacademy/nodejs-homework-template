const errorMessageList = {
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
};

const httpErrorFunc = (status, message = errorMessageList[status]) => {
  const err = new Error(`{message: ${message}}`);
  err.status = status;
  throw err;
};

module.exports = httpErrorFunc;
