const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(6).required,
}).required();

const putContactShema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(6),
})
  .min(1)
  .required();

module.exports = { addContactSchema, putContactShema };
