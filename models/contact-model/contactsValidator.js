const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string()
    .pattern(/^\w+(?:\s+\w+)*$/)
    .required()
    .messages({
      "string.pattern.base":
        '"name" must only contain alpha-numeric characters',
    }),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)
    .required()
    .messages({
      "string.pattern.base": '"phone" must be a valid phone number',
    }),
  favorite: Joi.boolean().required(),
});

const validateContact = (data) => {
  return contactAddSchema.validate(data);
};

module.exports = {
  validateContact,
};
