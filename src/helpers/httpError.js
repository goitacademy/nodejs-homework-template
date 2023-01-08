const httpError = (status, message) => {
  const e = new Error(message);
  e.status = status;
  return e;
};

module.exports = { httpError };
