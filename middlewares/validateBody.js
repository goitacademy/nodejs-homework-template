const { HttpError } = require("../utils/errors");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(404, error.message);
    }
    next();
  };
};

module.exports = validateBody;
