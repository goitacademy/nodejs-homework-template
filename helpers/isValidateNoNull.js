const setApiErrorStatus = require("./setApiErrorStatus");

const isValidateNoNull = (result) => {
  if (!result) {
    throw setApiErrorStatus(404);
  }

  return result;
};

module.exports = isValidateNoNull;