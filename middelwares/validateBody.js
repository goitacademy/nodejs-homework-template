const { HttpError } = require("../utils");

const validateBody = (schema) => {
  const fn = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(res.status(404).json(error.message));
    }
    next(error);
  };
  return fn;
};
module.exports = validateBody;