const { HttpErrors } = require("../utils");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpErrors(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
