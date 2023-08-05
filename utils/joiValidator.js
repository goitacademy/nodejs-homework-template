const Joi = require('joi');

const joiUserValidator = (data) => {
    return Joi.object().options({abortEarly: false})
    .keys({
        name: Joi.string().min(3), 
        email: Joi.string(), 
        phone: Joi.string(),
    }).validate(data);
}

const userValidator = (data) => {
    return Joi.object().options({abortEarly: false})
    .keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }).validate(data);
}

module.exports = {
    joiUserValidator,
    userValidator,
}