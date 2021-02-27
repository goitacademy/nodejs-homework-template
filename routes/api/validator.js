const Joi = require('joi')
const HttpCode = require('../../helpers/status')

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().min(3).max(50).required(),
  phone: Joi.string().min(3).max(50).required(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().min(3).max(50).optional(),
  phone: Joi.string().min(3).max(50).optional(),
})
module.exports.validateAddContact = (req, res, next) => {
  const { error } = schemaAddContact.validate(req.body)
  if (error) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'Missing required fields' })
  }
  next()
}

module.exports.validateUpdateContact = (req, res, next) => {
  schemaUpdateContact.validate(req.body)
  if (Object.keys(req.body).length === 0) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .json({ message: 'Missing required fields' })
  }
  next()
}
