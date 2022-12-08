const setApiErrorStatus = require("./setApiErrorStatus");

const checkNull = (result) => {
  if (!result) {
    throw setApiErrorStatus(404);
  }

  return result;
};

module.exports = checkNull;
