const { HttpError } = require("../helpers");

const validateBody = (schema, errorMessage) => {
  const func = async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
      next(HttpError(400, `missing ${errorMessage}`));
    }
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const missingFields = error.details.map((detail) => detail.context.label);
      if (error) {
        next(
          HttpError(
            400,
            `missing required ${missingFields.join(", ")} field(s)`
          )
        );
      }
    }
    next();
  };
  return func;
};
module.exports = validateBody;
