const Joi = require("joi");

const schemaPOST = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

const schemaPUT = Joi.object({
  name: Joi.string().alphanum().min(3).max(20),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
  favorite: Joi.boolean(),
});

const schemaPATCH = Joi.object({
  favorite: Joi.boolean().required().label("missing field favorite"),
});

const schemaAUTH = Joi.object({
  email: Joi.string().required().label("Missing email"),
  password: Joi.string().required().label("Missing password"),
});

module.exports = {
  schemaPUT,
  schemaPOST,
  schemaPATCH,
  schemaAUTH,
};
