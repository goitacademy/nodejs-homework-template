const RequestError = (status, message) => {
  const errorA = new Error(message);
  errorA.status = status;
  return errorA;
};

module.exports = RequestError;
