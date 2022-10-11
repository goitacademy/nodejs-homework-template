const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const lostField = schema.validate(req.body).error.details[0].path;
      next(
        RequestError(
          400,
          (error.message = `missing required ${lostField} field`)
        )
      );
    }
    next();
  };
  return func;
};

module.exports = validateBody;
