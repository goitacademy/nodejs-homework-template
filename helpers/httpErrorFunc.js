const httpErrorFunc = (status, message) => {
  const err = new Error(`{message: ${message}}`);
  err.status = status;
  throw err;
};

module.exports = httpErrorFunc;
