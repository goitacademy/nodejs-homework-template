import Joi from "@hapi/joi";

const schema = Joi.object({
  password: Joi.string().alphanum().min(6).max(32).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
 });

export default schema ;
