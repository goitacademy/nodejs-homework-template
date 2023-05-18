const { HttpError } = require("../helper/index");

const validateBody = (schema) => {
  const func = async (req, res, next) => {
    if (!Object.keys(req.body).length) {
      next(HttpError(400, `Missing fields`));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(
        HttpError(
          400,
          `missing required ${error.details[0].context.label} field`
        )
      );
    }
    next();
  };
  return func;
};
module.exports = validateBody;
