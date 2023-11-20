const { HttpError } = require("../utils");

const emptyBody = (errorsMessage) => {
  const func = (req, res, next) => {
    if (!Object.keys(req.body).length) {
      next(HttpError(400, errorsMessage));
    }
    next();
  };
  return func;
};

module.exports = emptyBody;
