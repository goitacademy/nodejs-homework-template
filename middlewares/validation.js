const Joi = require("joi");
const { createError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string()
    .pattern(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/)
    .required(),
});

const validation = (schema) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(createError(400, "missing fields"));
    return;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    const [details] = error.details;
    const { message } = details;
    if (details.type === "any.required") {
      next(createError(400, "missing required name field"));
      return;
    }
    next(createError(400, "Validation error, field " + message));
    return;
  }

  next();
};

const validateContactBody = validation(addSchema);

module.exports = {
  validateContactBody,
};