const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
<<<<<<< HEAD
  return error;
=======
  throw error;
>>>>>>> dde0c06544d8d0fbe61967dfadf96a7f8202570b
};

module.exports = HttpError;
