const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const wrapper = (req, res, next) => {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return wrapper;
};

module.exports = validateBody;