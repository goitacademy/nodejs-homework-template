const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const fieldName = error.details[0].path[0];
      next(HttpError(400, `missing required ${fieldName} field`));
    }
    next();
  };
  return func;
};
module.exports = validateBody;
