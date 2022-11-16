const Joi = require("joi");

const schemaPostUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemaPatchUser = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
  _id: Joi.string(),
});

module.exports = {
  schemaPostUser,
  schemaPatchUser,
};
