const { errorMessageList } = require("./errorMessageList");

const CreateError = (status, message = errorMessageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = { CreateError };
