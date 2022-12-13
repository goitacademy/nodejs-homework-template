const { HttpError } = require("../helpers");

function validateBody(shema) {
  return (req, res, next) => {
    const { error } = shema.validate(req.body);
    if (error) {
      next(HttpError(400, error.messege));
      return;
    }
    next();
  };
}

module.exports = validateBody;
