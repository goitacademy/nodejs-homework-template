const Joi = require('joi')

// === schema ADD ===
const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(60).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .optional(),

  phone: Joi.string()
    .regex(/^\d{3}-\d{3}-\d{4}$/)
    .required(),

  coordinates: Joi.string().min(15).max(38).optional(),
})

// === schema UPDATE ===
const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(60).optional(),
  email: Joi.string().min(2).max(60).optional(),
  phone: Joi.string().min(2).max(60).optional(),
})

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (Object.keys(obj).length === 0) {
    return next({
      status: 400,
      message: 'missing fields',
    })
  }

  if (error) {
    const field = error.details[0].path[0]

    return next({
      status: 400,
      message: `missing required ${field} field`,
    })
  }
  next()
}

const addUser = (req, _res, next) => {
  return validate(schemaAddContact, req.body, next)
}

const updateUser = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}

module.exports = {
  addUser,
  updateUser,
}
