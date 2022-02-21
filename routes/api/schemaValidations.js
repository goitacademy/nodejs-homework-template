const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Поле name обязательное",
    "string.empty": "Поле name не может быть пустым",
  }),
  email: Joi.string().required(),
  phone: Joi.string().pattern(new RegExp("[0-9]")).min(9).required(),
});

module.exports = { schemaCreateContact };
