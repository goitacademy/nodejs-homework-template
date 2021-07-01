const Joi = require('joi')

const postSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required(),
  email: Joi.string()
    .email()
    .required(),
  phone: Joi.string()
    .required()
})

const putValidSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .max(30),
  email: Joi.string()
    .email(),
  phone: Joi.string()
}).or('name', 'email', 'phone')

module.exports = {
  postSchema,
  putValidSchema
}
