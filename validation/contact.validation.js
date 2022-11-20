const Joi = require('joi')

const contactValidation = (data) => {
  
  const schema = Joi.object({
    email: Joi.string().min(2).max(50).required().email(),
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(2).max(50).required()
  })

  return schema.validate(data)
}

module.exports = { contactValidation }
