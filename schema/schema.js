import Joi from "joi";

export const addSchema = Joi.object({
  name: Joi.string().min(2).max(20).required().messages({
    "any.required": "missing required name field",
  }),

  phone: Joi.string().required().messages({
    "any.required": "missing required phone field",
  }),

  email: Joi.string().required().messages({
    "any.required": "missing required email field",
  }),

  favorite: Joi.boolean()
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({ "any.required": "missing required favorite field"}),
});

export default { addSchema, updateFavoriteSchema };
