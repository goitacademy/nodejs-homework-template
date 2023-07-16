const Joi = require ('joi');

const userSchema = Joi.object({
    email: Joi.string().required(),
    passward: Joi.string().required(),
})

module.exports = {
    userSchema
}