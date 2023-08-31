const { HttpErrors } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(HttpErrors(400, error.message));
    }

    next();
  };

  return func;
};

module.exports = validateBody;
