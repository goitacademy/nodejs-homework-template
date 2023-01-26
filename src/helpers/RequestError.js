const messages = {
  400: 'Bad Request',
  401: 'Unautorized',
  403: 'Forbidden',
  404: 'Not found',
  405: 'Conflict',
};

const requestError = (status, message = messages[status])=>{
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = requestError
