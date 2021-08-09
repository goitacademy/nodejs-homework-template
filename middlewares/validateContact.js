const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().min(0.01).required(),
  email: Joi.string().required(),
})

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string()
})
  .or('name', 'email', 'phone')

const validateContact = (req, res, next) => {
  console.log(req.body)
  const { error } = contactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  next()
}
const validateContactUpdate = (req, res, next) => {
  console.log(req.body)
  const { error } = schemaUpdate.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message,
    })
  }
  next()
}

module.exports = {
  validateContact,
  validateContactUpdate
}
