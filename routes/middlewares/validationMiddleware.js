const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(10).max(15).required(),
  favorite: Joi.boolean(),
})

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
})

const contactValidation = (req, res, next) => {
  const result = contactSchema.validate(req.body)
  if (result.error) {
    return res.status(400).json({ status: result.error.details })
  }
  next()
}
const favoriteValidation = (req, res, next) => {
  const result = favoriteSchema.validate(req.body)
  if (result.error) {
    return res
      .status(400)
      .json({ status: result.error.details.status[0].message })
  }
  next()
}

module.exports = { contactValidation, favoriteValidation }
