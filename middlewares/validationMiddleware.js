const Joi = require('joi')

const validationMiddleware = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().max(30),
    phone: Joi.string().min(10).max(14).required(),
    favorite: Joi.boolean().optional(),
  })

  const validationResult = schema.validate(req.body)

  if (validationResult.error) {
    await res.status(400).json({ message: validationResult.error.message })
    return
  }
  next()
}
const validateFavoriteStatus = async (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  })

  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    await res.status(400).json({ message: validationResult.error.message })
    return
  }
  next()
}
module.exports = { validationMiddleware, validateFavoriteStatus }
