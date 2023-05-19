const { NotFound } = require("http-errors");

const validateBody = (schema) => {
    const func = (req, res, next) => {
      const { error } = schema.validate(req.body);
      if (error) {
        next(NotFound(error.message))
      }
      next();
    };
    return func;
  };
  
  module.exports = validateBody;