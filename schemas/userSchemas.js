const Joi = require("joi");

const {emailRegexp} = require("../constants/users");

const userRegisterSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().required().pattern(emailRegexp),
    subscription: Joi.string(),
    
});

const userLoginSchema = Joi.object({
    password: Joi.string().required().min(6),
    email: Joi.string().required().pattern(emailRegexp),
    subscription: Joi.string(),
});
const userEmailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

module.exports = {
    userRegisterSchema,
    userLoginSchema,
    userEmailSchema,
}