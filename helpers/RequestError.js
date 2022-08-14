const RequestError = (status = 404, message = "Not found") => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = RequestError;
