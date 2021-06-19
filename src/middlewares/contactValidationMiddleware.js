const Joi = require('joi')

const postValidation = (req, res, next) => {
  const validationSchemaPOST = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .required(),
    phone: Joi.string()
      .max(12)
      // eslint-disable-next-line
      .pattern(/^\d[\d\(\)\ -]{4,14}\d$/)
      .required(),
  })
  const dataValidate = validationSchemaPOST.validate(req.body)
  if (dataValidate.error) {
    return res
      .status(404)
      .json({ message: `Validation error ${dataValidate.error.message}` })
  }
  next()
}

const patchValidation = (req, res, next) => {
  const validationSchemaPATCH = Joi.object({
    name: Joi.string().alphanum().min(3).max(15),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string()
      .max(12)
      .pattern(/\+?[0-9\s\-\\)]+/),
  }).min(1)
  const dataValidate = validationSchemaPATCH.validate(req.body)

  if (dataValidate.error) {
    return res
      .status(404)
      .json({ message: `Validation error ${dataValidate.error.message}` })
  }
  next()
}
module.exports = {
  postValidation,
  patchValidation,
}
