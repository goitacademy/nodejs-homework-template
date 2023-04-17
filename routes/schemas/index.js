const Joi = require("joi");

const SCHEMAS = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const createContact = Joi.object().keys({
  body: SCHEMAS,
});

const updateContact = Joi.object().keys({
  params: Joi.object().keys({
    contactId: Joi.string().required(),
  }),
  body: SCHEMAS,
});

module.exports = {
  createContact,
  updateContact,
};


