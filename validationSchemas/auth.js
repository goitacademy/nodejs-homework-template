const Joi = require('joi')

const authUserSchema = Joi.object({
  email: Joi.string().pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).required(),
  password: Joi.string().pattern(/^(?=.*)(?=.*[a-zA-Z0-9]).{7,}$/).required(),
})

module.exports = { authUserSchema }