const { HttpError } = require("../middlewares/httpError");

const IsEmptyBody = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return next(HttpError(400, "Missing fields"));
  }

  next();
};

module.exports = {
  IsEmptyBody,
};
