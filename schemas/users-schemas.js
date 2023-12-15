const Joi = require("joi");

const userRegisterSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
}).unknown(false);

const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
}).unknown(false);

const uploadAvatarSchema = Joi.object({
  avatar: Joi.object().required().messages({
    "any.required": "Avatar is required",
  }),
}).unknown(false);

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  uploadAvatarSchema,
};
