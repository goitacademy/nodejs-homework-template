// created by Irina Shushkevych
const Joi = require('joi')

const postPutValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Zа-яА-Я ]+$/)
      .min(2)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).max(20).required(),
  })
  const valid = schema.validate(req.body)
  if (valid.error) {
    res.locals.code = 400
    res.locals.message = valid.error.details[0].message
    next()
    return
  }
  next()
}

const patchValidate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Zа-яА-Я ]+$/)
      .min(2)
      .max(30)
      .optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(7).max(20).optional(),
  })
  const valid = schema.validate(req.body)

  if (valid.error) {
    res.locals.code = 400
    res.locals.message = valid.error.details[0].message
    next()
    return
  }
  next()
}

module.exports = { postPutValidate, patchValidate }
