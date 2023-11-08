const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Номер телефону повинен мати формат (XXX) XXX-XXXX",
    }),
});

module.exports = contactsSchema;
