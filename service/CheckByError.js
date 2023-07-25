const { CreateError } = require("./CreateError");

const CheckByError = (bool, status, message) => {
  if (bool) {
    throw CreateError(status, message);
  }
};

module.exports = CheckByError;
