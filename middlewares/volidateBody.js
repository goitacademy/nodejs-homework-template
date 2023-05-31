const { HttpError } = require("../helpers/index");

const volidateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = {
  volidateBody,
};