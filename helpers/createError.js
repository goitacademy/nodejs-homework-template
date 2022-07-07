function createError(status, message = "Not found") {
  const error = new Error(message);
  error.status = status;
  return error;
}
module.exports = createError;
