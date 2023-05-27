// const { HttpError } = require("../../helpers");
// throw HttpError(404, "404! Not found");
const HttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
