const HttpError = (status, message) => {
  const error = new Error(message);
  console.log(Error);
  error.status = status;
  return error;
}

module.exports = HttpError