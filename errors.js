module.exports = (status, message) => {
  const e = new Error();
  e.status = status;
  e.message = message;
  return e;
};
