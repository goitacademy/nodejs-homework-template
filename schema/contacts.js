const Joi = require("joi");

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"missing required name field"`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"missing required email field"`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"missing required phone field"`,
  }),
  favorite: Joi.boolean(),
});


const contactsPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).options({ allowUnknown: false });

const contactUpdateFavoriteSchema =  Joi.object({
  favorite: Joi.boolean().required(),
})

module.exports = { 
  contactsAddSchema,
  contactsPutSchema,
  contactUpdateFavoriteSchema,
};