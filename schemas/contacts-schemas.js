import Joi from "joi";

const ErrorMessage = (fieldName) => {
  const specific =
    fieldName === "name"
      ? { "string.min": `name should have a minimum length of 2` }
      : { "string.email": `email must have valid form` };
  return {
    "string.base": `${fieldName} should be a type of 'text'`,
    "any.required": `missing required ${fieldName} field`,
    ...specific,
  };
};

export const addContactSchema = Joi.object({
  name: Joi.string().min(2).trim().required().messages(ErrorMessage()),
  email: Joi.string().email().required().messages(ErrorMessage()),
  phone: Joi.string().required().messages(ErrorMessage()),
});

export const updateContactShema = Joi.object({
  name: Joi.string().min(2).trim().required().messages(ErrorMessage()),
  email: Joi.string().email().required().messages(ErrorMessage()),
  phone: Joi.string().required().messages(ErrorMessage()),
});
