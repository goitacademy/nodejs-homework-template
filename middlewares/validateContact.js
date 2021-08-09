const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phonenumber: Joi.number().min(0.01).required(),
})

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

module.exports = validateContact
