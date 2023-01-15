const Joi = require("joi");

const addContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer().required(),
});
const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().integer().required(),
  favorite: Joi.boolean(),
});

const validationSchemaStatus = Joi.object({
  favorite: Joi.boolean(),
});

module.exports = {
  addContactsSchema,
  updateContactsSchema,
  validationSchemaStatus,
};
