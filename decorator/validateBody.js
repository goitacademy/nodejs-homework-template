const HttpError = require("../helper/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(404, error.message));
    }
    next();
  };
};
module.exports = validateBody;
