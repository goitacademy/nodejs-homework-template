const Joi = require("joi");

const schemaPost = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const schemaPatch = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
  _id: Joi.string(),
});

module.exports = {
  schemaPost,
  schemaPatch,
};
