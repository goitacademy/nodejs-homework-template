const setApiErrorStatus = require("./setApiErrorStatus");

const isValidNoNull = (result) => {
  if (!result) {
    throw setApiErrorStatus(404);
  }

  return result;
};

module.exports = isValidNoNull;
