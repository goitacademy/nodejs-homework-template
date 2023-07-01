const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const requiredField = error.message
        .replace(`"`, "")
        .replace('" is required', "");
      throw HttpError(400, `missing required ${requiredField} field`);
    }
    next();
  };
  return func;
};

module.exports = validateBody;