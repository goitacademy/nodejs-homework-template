const Joi = require("joi")
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().pattarn(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

module.exports = {
    registerSchema,
    loginSchema,
};