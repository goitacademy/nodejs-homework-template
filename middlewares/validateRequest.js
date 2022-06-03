const errorHandler = require("../errorHandler");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      errorHandler(400, error.message);
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
