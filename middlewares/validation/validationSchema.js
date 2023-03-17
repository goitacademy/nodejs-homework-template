const Joi = require("joi");

const contactJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(10).max(15).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua", "org"] },
    })
    .required(),
  favorite: Joi.boolean(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .valid(true, false)
    .messages({ "any.required": "missing field favorite" }),
});

module.exports = {
  contactJoiSchema,
  favoriteJoiSchema,
};
