import Joi from "@hapi/joi";

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(32).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean(),
});

export { schema };
