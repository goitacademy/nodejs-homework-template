const { createError } = require("../helpers");

const validation = (schema, message) => {
  const func = (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);
      if (error) {
        throw createError(400, message);
      }
      next();
    } catch (error) {
      next(error);
    }
  };

  return func;
};

module.exports = validation;
