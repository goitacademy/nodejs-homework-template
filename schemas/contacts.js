const Joi = require("joi")

const contactAddSchema = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string().required(),
    phone: Joi.string().required()
  })

  module.exports = {contactAddSchema};