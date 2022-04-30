const { createError } = require("../helpers");

const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(error));
    }
    next();
  };
};

module.exports = validation;
