const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const userValidSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": "Set password for user",
  }),

  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
});

const updateSub = Joi.object({
  subscription: Joi.string()
    .required()
    .valid("starter", "pro", "business")
    .messages({ msg: "This subscription doesn't exist" }),
});

module.exports = { schema, userValidSchema, updateSub };
