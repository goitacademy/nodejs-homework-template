

const errorMessageList = {
  400: 'Bad request',
  401: 'Unauthrized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict'
}


const HttpError = (status, message = errorMessageList[status]) => {
  const error = new Error(message)
  error.status = status;
  return error;
}
export default HttpError;