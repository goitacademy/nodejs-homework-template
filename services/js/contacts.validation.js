import Joi from "joi";

export const schemaReq = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
  phone: Joi.string(),
  // phone: Joi.string().pattern(
  //   new RegExp("/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/")
  // ),
  favourite: Joi.boolean(),
}).and("name", "email", "phone");

export const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "pl"] },
  }),
  phone: Joi.string().pattern(
    new RegExp("/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/")
  ),
  favourite: Joi.boolean(),
}).or("name", "email", "phone", "favourite");
