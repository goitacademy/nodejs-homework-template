const { CustomError } = require("../helpers");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return new CustomError(404, error.message);
    }
    return next();
  };
}

module.exports = {
  validateBody,
};
