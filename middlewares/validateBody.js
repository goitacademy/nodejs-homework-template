const { HttpError } = require("../utils/errors");

const validateBody = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError(400, error.message);
      // next(new HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
