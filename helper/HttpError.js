const errorType= {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: 'Not Found'
}
const HttpError = (status, message= errorType[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {HttpError,};
