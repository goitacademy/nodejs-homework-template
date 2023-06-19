const Joi = require("joi");
const {emailRegexp} = require("../constans/contacts")

const userRegisterSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
})

const userLoginShema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  token: Joi.string(),
})

module.exports = {
  userRegisterSchema,
  userLoginShema
}