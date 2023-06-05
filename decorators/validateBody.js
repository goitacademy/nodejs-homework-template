const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const validate = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    next(error);
  };
  return validate;
};

module.exports = validateBody;
