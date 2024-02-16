const Joi = require("joi");

const addContactScheme = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const putContactScheme = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string(),
});

const contactIdScheme = Joi.object({
  contactId: Joi.string().alphanum().min(1).required(),
});

const updFavScheme = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactScheme,
  putContactScheme,
  contactIdScheme,
  updFavScheme,
};
