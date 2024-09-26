const { requestError } = require("../utils");

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
