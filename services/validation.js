const Joi = require("joi");

const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).max(11).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  phone: Joi.string().min(3).max(11).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .optional(),
});

const Validate = (schema, obj, next) => {
  const { error } = schema.validate(obj)

  if (error) {
    const [{ message }] = error.details
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`
    })
  }
  next()
}

module.exports.createContact = (req, _res, next) => {
  return validate(schemaCreateContact, req.body, next)
}

module.exports.updateContact = (req, _res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
