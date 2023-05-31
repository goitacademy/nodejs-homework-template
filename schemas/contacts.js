const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+)?$/i)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/)
    .required(),
});

module.exports = {
  contactsSchema,
};
