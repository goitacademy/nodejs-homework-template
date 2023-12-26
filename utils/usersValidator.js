const Joi = require('joi');

const authUserDataValidator = (data) => 
Joi
    .object()
    .options({ abortEarly: false })
    .keys({ 
      email: Joi.string().email().required(),
      password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
      
    })
    .validate(data);

module.exports = {
    authUserDataValidator,
}