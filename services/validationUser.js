const Joi = require('joi')

const schemaForSign = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(8)
    .required()
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)
  if (error) {
    console.log(error)
    return next({
      status: 400,
      message: 'Bad request'
    })
  }
  next()
}

module.exports.validateSign = (req, _res, next) => {
  return validate(schemaForSign, req.body, next)
}
module.exports.validateUploadAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(400).join({
      status: 400,
      data: 'Bad request',
      message: 'field of avatar with file not found'
    })
  }
  next()
}
