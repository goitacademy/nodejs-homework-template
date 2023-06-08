const HttpError = (status, message) => {
  console.log("помилка");
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
