const requestError = (status, message) => {
  console.log("message: ", message);
  console.log("status: ", status);
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = requestError;
