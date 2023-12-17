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

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const resendEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  uploadAvatarSchema,
  registerSchema,
  resendEmailSchema,
};
