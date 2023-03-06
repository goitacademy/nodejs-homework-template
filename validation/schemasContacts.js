const Joi = require("joi")

const addContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).required(),
}).required()

const putContactSchema = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  phone: Joi.string().min(3),
})
  .min(1)
  .required()

module.exports = {
  addContactSchema,
  putContactSchema,
}