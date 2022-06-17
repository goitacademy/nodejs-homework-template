const createError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};

module.exports = createError;
