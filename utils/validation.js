const Joi = require('joi')


const validateUser = (user) => {
    const schema = Joi.object({
      email: Joi.string().email().min(8).max(500).required(),
      password: Joi.string().min(8).max(1024).required(),
    })
    return schema.validate(user)
}

module.exports = validateUser;

