const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;

// эта строка создана для нового пуша на гит, потому что чловил глук
