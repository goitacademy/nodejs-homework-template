const joi = require('joi')

const signupValidator = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(5),
})

module.exports = signupValidator;
