const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  console.log("error massage", error);
  return error;
};

module.exports = HttpError;
