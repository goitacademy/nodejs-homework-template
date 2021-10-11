const Joi = require('joi')

const schemaContact = Joi.object({
  contactId: Joi.string().required(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[(][\d]{3}[)]\s[\d]{3}[-][\d]{4}/).required(),
  isFavorite: Joi.boolean().optional(),
})

const schemaStatusContact = Joi.object({
  isFavorite: Joi.boolean().optional(),
})

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: `Field ${err.message.replace(/"/g, '')}`,
    })
  }
}

module.exports.validateContact = async (req, res, next) => {
  return await validate(schemaContact, req.body, res, next)
}

module.exports.validateStatusContact = async (req, res, next) => {
  return await validate(schemaStatusContact, req.body, res, next)
}
