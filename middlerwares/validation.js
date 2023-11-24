const { HttpError } = require("../helpers");

const validation = (schema, message, status) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(status || 400, message || error.message);
    }
    next();
  };
};

module.exports = validation;
