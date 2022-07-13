const messages = {
  404: "Not found",
};

const createError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
module.exports = createError;
