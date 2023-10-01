const HttpError = require("./HttpError");

const checkId = (result) => {
  if (!result) {
    throw HttpError(404, "Not found");
  }
};

module.exports = checkId;
