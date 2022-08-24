const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().alphanum(),
});

const userSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string(),
  subscription: Joi.any().valid("starter", "pro", "business"),
});



module.exports = { schema, userSchema };
