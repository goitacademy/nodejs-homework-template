const { HttpError } = require("../helpers");

const validateBody = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const requiredField = error.details[0].context.label;
    throw HttpError(400, `missing required ${requiredField} field`);
  }
  next();
};

module.exports = { validateBody };
