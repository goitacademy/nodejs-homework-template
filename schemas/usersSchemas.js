const Joi = require('joi');

const registerUser = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
});

module.exports = {
    registerUser,
};
