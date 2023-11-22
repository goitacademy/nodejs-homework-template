const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .message('"name" is incorrect')
    .required(),
  email: Joi.string()
    .email()
    .message('"email" is incorrect')
    .pattern(
      /^((([0-9A-Za-z]{1}[-0-9A-z.]{0,30}[0-9A-Za-z]?)|([0-9А-Яа-я]{1}[-0-9А-я.]{0,30}[0-9А-Яа-я]?))@([-A-Za-z]{1,}\.){1,}[-A-Za-z]{2,})$/
    )
    .message('"email" is incorrect')
    .required(),
  phone: Joi.string()
    .pattern(/^([0-9+-,.()])/)
    .message('"phone" is incorrect')
    .required(),
});

module.exports = {
  addSchema,
};
