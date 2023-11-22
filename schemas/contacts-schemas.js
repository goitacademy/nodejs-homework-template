import Joi from "joi";

const ErrorMessage = (fieldName) => {
  return {
    "string.base": `${fieldName} should be a type of 'text'`,
    "any.required": `missing required ${fieldName} field`,
    "string.email": `invalid email form`,
    "string.min": `name should have a minimum length of 2`,
  };
};

export const addContactSchema = Joi.object({
  name: Joi.string().min(2).required().messages(ErrorMessage("name")),
  email: Joi.string().email().required().messages(ErrorMessage("email")),
  phone: Joi.string().required().messages(ErrorMessage("phone")),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).messages(ErrorMessage("name")),
  email: Joi.string().email().messages(ErrorMessage("email")),
  phone: Joi.string().messages(ErrorMessage("phone")),
  favorite: Joi.boolean(),
});

export const patchContactSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing field favorite" }),
});
