const { HttpError, changeOutputMessage } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const requiredFields = Object.keys(schema.describe().keys);
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length === 1) {
        const fieldName = missingFields[0];
        next(HttpError(400, changeOutputMessage(`missing required ${fieldName} field`)));
      } else {
        next(HttpError(400, changeOutputMessage("missing fields")));
      }
    }
    next();
  };
  return func;
};

module.exports = validateBody;