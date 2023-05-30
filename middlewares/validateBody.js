const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (Object.keys(req.body).length === 0) {
      next(
        RequestError(
          400,
          `missing required ${error.details[0].context.key} field`
        )
      );
    } else {
      if (error) {
        next(
          RequestError(
            400,
            `missing required ${error.details[0].context.key} field`
          )
        );
      }
      next();
    }
  };

  return func;
};

module.exports = { validateBody };
