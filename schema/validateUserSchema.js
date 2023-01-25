const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: false },
    })
    .min(3)
    .required()
    .messages({ "any.required": "missing required email field" }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .max(15)
    .required()
    .messages({ "any.required": "missing required phone field" }),
});

module.exports = {
  userSchema,
};
