const createError = (status, message) => {
  console.log(message);
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  createError,
};
