const Joi = require("joi");

const SCHEMAS = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const createContact = Joi.object().keys({
  body: SCHEMAS,
});

const updateContact = Joi.object().keys({
  params: Joi.object().keys({
    contactId: Joi.string().required(),
  }),
  body: SCHEMAS,
},)

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()

})

module.exports = {
  createContact,
  updateContact,
  updateFavoriteSchema
};


