const reqError = (status, message) => {
  const error = new Error(`${status} ${message}`);
  return error;
};

module.exports = reqError;
