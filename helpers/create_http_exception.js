const create_http_exception = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = {
  create_http_exception,
};
