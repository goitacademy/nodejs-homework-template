const createError = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  console.log(e.status, e.message);
  return e;
};

module.exports = {
  createError,
};
