const Joi = require("joi");
const { HttpError } = require("../helpers");
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"name" cannot be an empty field`,
    "string.base": `"name" should be a type of 'text'`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string()
    .pattern(/\(\d{3}\)\s\d{3}-\d{4}/)
    .required()
    .messages({
      "string.empty": `"phone" cannot be empty`,
      "string.base": `"phone" must be string`,
      "string.pattern.base":
        "Invalid phone's format, enter you phone like this (111) 111-1111",
    }),
});

const validateAddContact = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const type = error.details[0].type;
    if (type === "any.required") {
      const key = error.details[0].context.key;
      throw HttpError(400, `missing required ${key} field`);
    }
    throw HttpError(400, error.message);
  }
  next();
};

const validateUpdateContact = (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    const type = error.details[0].type;
    if (type === "any.required") {
      throw HttpError(400, `missing fields`);
    }

    throw HttpError(400, error.message);
  }
  next();
};

module.exports = { validateAddContact, validateUpdateContact };
