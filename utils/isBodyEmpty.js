const HttpError = require("./HttpError");

const isBodyEmpty = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    if (req.method === "PATCH") {
      next(HttpError(400, "missing field favorite"));
    } else {
      next(HttpError(400, "missing fields"));
    }
  }
  next()
};

module.exports = isBodyEmpty;
