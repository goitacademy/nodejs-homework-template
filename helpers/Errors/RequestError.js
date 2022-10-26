const messages = {
    400: 'Bad request',
    401: 'Not authorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',  
}


const RequestError = (message =  messages[status], status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = RequestError;