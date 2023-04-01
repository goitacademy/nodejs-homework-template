const Joi = require("joi");
const { HttpError } = require("../helpers");
const schema = Joi.object({
  name: Joi.string().messages({
    "string.empty": `"name" cannot be an empty field`,
    "string.base": `"name" should be a type of 'text'`,
  }),
  email: Joi.string().email({ minDomainSegments: 2 }).messages({
    "string.empty": `"email" cannot be empty`,
    "string.base": `"email" must be string`,
  }),
  phone: Joi.string()
    .pattern(/\(\d{3}\)\s\d{3}-\d{4}/)
    .messages({
      "string.empty": `"phone" cannot be empty`,
      "string.base": `"phone" must be string`,
      "string.pattern.base":
        "Invalid phone's format, enter you phone like this (111) 111-1111",
    }),
});

const validateUpdateContact = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }
  next();
};

module.exports = { validateUpdateContact };
