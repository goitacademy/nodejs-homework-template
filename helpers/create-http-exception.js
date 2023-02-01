const createHttpException = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = {
  createHttpException,
};
