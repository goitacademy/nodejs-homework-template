const { HttpError } = require("../utils/errors");

const validateStatus = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw new HttpError(400, "missing field favorite");
    }
    next();
  };
};

module.exports = validateStatus;
