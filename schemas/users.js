const Joi = require("joi");
const registrationSchema = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().required(),
});
const loginSchema = Joi.object({});

module.exports = { registrationSchema, loginSchema };
