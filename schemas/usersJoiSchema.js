const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),

});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

const updateSubsSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const updateAvatarSchema = Joi.object({
  avatarURL: Joi.any().required()
});

const usersJoiSchema = {
  registerSchema,
  loginSchema,
  updateSubsSchema,
  updateAvatarSchema,
};

module.exports = usersJoiSchema;
