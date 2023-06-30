const { HttpError } = require("../helpers");

const validateBody = (shema) => {
  const func = async (req, res, next) => {
    const { error } = shema.validate(req.body, { abortEarly: false });
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
