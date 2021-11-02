const Joi = require('joi')

const validatePostPutContact = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
      .required(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .required(),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ status: err.details })
  }
  next()
}

const validatePatchContact = async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
      .optional(),
    phone: Joi.string()
      .pattern(/^[0-9]+$/)
      .optional(),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ status: err.details })
  }
  next()
}

const validatePatchStatusContact = async (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required(),
  })
  try {
    await schema.validateAsync(req.body)
  } catch (err) {
    return res.status(400).json({ status: err.details })
  }
  next()
}

module.exports = {
  validatePostPutContact,
  validatePatchContact,
  validatePatchStatusContact
}
