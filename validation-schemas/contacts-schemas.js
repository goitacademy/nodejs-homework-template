import Joi from "joi";

export const addContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required "name" field`,
    "string.base": `"name" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": ` missing required "email" field`,
    "string.base": `"email" should be a type of 'text'`,
  }),
  phone: Joi.string().min(14).max(14).required().messages({
    "any.required": `missing required "phone" field`,
    "string.base": `"phone" should be a type of 'text'`,
    "string.min": `"name" should have a minimum length of {#limit}`,
  }),
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": `missing required "favorite" field` }),
}).or("name", "email", "phone", "favorite");

export const updateContactSchema = Joi.object()
  .keys({
    name: addContactSchema.extract("name").optional(),
    email: addContactSchema.extract("email").optional(),
    phone: addContactSchema.extract("phone"),
    favorite: addContactSchema.extract("favorite"),
  })
  .or("name", "email", "phone", "favorite");

export const contactFavoriteSchema = Joi.object()
  .keys({
    favorite: addContactSchema.extract("favorite"),
  })
  .or("favorite");
