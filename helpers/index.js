// const Joi = require("joi");

function HttpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
};


module.exports = {
    HttpError
};