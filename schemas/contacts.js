const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required()
    .messages({
      "string.pattern.base": "field name is incorrect format",
      "string.empty": "missing required name field",
      "any.required": "missing required name field",
    }),
  email: Joi.string()
    .email()
    .pattern(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/
    )
    .required()
    .messages({
      "string.email": "field email is incorrect format",
      "string.pattern.base": "field email is incorrect format",
      "string.empty": "missing required email field",
      "any.required": "missing required email field",
    }),
  phone: Joi.string()
    .pattern(/^([0-9+-,.()])/)
    .required()
    .messages({
      "string.pattern.base": "field phone is incorrect format",
      "string.empty": "missing required phone field",
      "any.required": "missing required phone field",
    }),
});


module.exports = {
  addSchema,
};
