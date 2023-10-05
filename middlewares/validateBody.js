const { HttpError } = require("../middlewares/httpError");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(res.body);

    if (error) {
      return next(new HttpError(422, error));
    }
    next();
  };
};

module.exports = {
  validateBody,
};
