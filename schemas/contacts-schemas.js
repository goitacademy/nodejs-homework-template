import Joi from 'joi';

const contactsAddSchema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": "Missing required name field",
      "string.base": "Field name must be a string",
    }),
    email: Joi.string().required().messages({
      "any.required": "Missing required email field",
      "string.base": "Field email must be a string",
    }),
    phone: Joi.string().required().messages({
      "any.required": "Missing required phone field",
      "string.base": "Field phone must be a string",
    }),
    favorite: Joi.boolean(),
  });

  const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
  })

  export default {
    contactsAddSchema,
    contactUpdateFavoriteSchema,
  }