const helper = require("../helpers");

const validateBody = (schema, message) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(helper.HttpError(400, message || error.message));
    }
    next();
  };

  return func;
};

module.exports = validateBody;
