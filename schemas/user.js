const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter"),
});

module.exports = userSchema;
