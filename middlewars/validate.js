const { HttpError } = require("../helpers/HttpError");

const updateContactValidate = (schema) => {
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
  updateContactValidate,
};
