const HttpError = require("../helpers");

const checkBody = (request, response, next) => {
  const body = request.body;
  if (Object.keys(body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  next();
};

module.exports = checkBody;
