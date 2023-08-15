const { HttpError } = require("../helpers");

const validateBody = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      let errorMessage = "";

      if (error.details && error.details.length > 0) {
        const missingField = error.details[0].context.key;
        errorMessage = `missing required ${missingField} field`;
      }
      if (Object.keys(req.body).length === 0) {
        errorMessage = "missing fields";
      }
      next(HttpError(400, errorMessage));
    } else {
      next();
    }
  };

  return func;
};

module.exports = validateBody;
