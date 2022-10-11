const createReject = (status, message) => {
  console.log(message);
  const err = new Error(message);
  err.status = status;
  return err;
};

module.exports = createReject;
