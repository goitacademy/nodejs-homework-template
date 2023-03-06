const Joi = require("joi");

const validationPost = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const validationPut = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer(),
});

const validationPatch = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  validationPost,
  validationPut,
  validationPatch,
};
