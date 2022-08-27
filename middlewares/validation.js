const { BadRequest } = require("http-errors");

const validation = (schema) => {
  return (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequest(error.message));
    }
    next();
  };
};

module.exports = validation;
