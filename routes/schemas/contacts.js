const Joi = require("joi");


const createContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
});

const updateContact = Joi.object({
  params: Joi.object().keys({
    contactId: Joi.string().required(),
  }),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
},)

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()

})

module.exports = {
  createContact,
  updateContact,
  updateFavoriteSchema
};