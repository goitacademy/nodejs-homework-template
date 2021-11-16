const Joi = require('joi')

const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const joiContactsShcemaAdd = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(emailRegexp),
  phone: Joi.string().min(7).required(),
  favorite: Joi.boolean().optional()
})

const joiContactsShcemaUpd = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().optional().pattern(emailRegexp),
  phone: Joi.string().min(7).optional(),
  favorite: Joi.boolean().optional()
})

const joiUserSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp),
  password: Joi.string().required().min(6),
  subscription: Joi.string().optional()
})

module.exports = { joiContactsShcemaAdd, joiContactsShcemaUpd, joiUserSchema }
