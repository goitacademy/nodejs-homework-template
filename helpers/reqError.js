const reqError = (res, status, message) => {
  const error = new Error(`${res.status(status).statusCode} ${message}`);
  return error;
};

module.exports = reqError;
