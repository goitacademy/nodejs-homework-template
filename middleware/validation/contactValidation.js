const Joi = require('joi')
const { BadRequest } = require('http-errors')

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().min(14).max(14).required(),
})

const addValidation = (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  next()
}

module.exports = addValidation
