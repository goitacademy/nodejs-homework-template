const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    console.log(req);
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
