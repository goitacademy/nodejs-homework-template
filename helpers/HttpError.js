const DEF_STATUS = 500;

const statusMessage = {
  /* client errors */
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  422: 'Unprocessable Content',
  /* server errors */
  500: 'Sever error',
};

const HttpError = (status = DEF_STATUS, message = statusMessage[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export default HttpError;
