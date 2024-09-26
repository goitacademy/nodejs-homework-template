const { HttpError } = require("../helper/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(404, message.error));
    }
    next();
  };
};
module.exports = validateBody;
