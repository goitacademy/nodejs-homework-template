const Joi = require("joi");

const userValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  avatar: Joi.string(),
});

const schemaPost = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "pl", "org", "eu"] },
    })
    .required(),
  phone: Joi.string().required().min(5),
  favorite: Joi.boolean(),
});

const schemaPut = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl", "org", "eu"] },
  }),
  phone: Joi.string().min(5),
  favorite: Joi.boolean(),
});

const schemaPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  userValidationSchema,
  schemaPost,
  schemaPut,
  schemaPatch,
};
