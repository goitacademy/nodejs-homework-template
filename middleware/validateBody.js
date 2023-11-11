const { HttpError } = require("../HttpErrors");
const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
  };
  return func;
};

module.exports = validateBody;