const Joi = require("joi");

const { emailRegexp } = require("../constants/users");

const userRegisterSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
})

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
    userRegisterSchema, 
    userLoginSchema,
}