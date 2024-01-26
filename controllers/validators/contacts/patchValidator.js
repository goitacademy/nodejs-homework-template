import Joi from "@hapi/joi"

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(32),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: {allow: true}}),
  phone: Joi.number(),
  favorite: Joi.boolean().required(),

});

export { schema }