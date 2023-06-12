const { HttpError } = require("../helpers");
const { schema } = require("../schemas/contacts");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = `missing required ${error.details[0].context.label} field`;
      throw HttpError(400, message);
      }
      next()
  };
  return func;
};

const validateUpdateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const message = "missing fields";
      throw HttpError(400, message);
    }
    next();
  };
  return func;
}

module.exports = { validateBody, validateUpdateBody };
