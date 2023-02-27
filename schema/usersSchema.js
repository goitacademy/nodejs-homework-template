const Joi = require("joi");

const usersSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = usersSchema;
