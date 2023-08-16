import Joi from "joi";

const addSchema = Joi.object({
  name: Joi.string().min(3).max(33).required().messages({
    "string.empty": "Name is required. Please provide a name.",
    "string.min": "Name should have a minimum of {#limit} characters.",
    "string.max": "Name should have a maximum of {#limit} characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email":
      "Invalid email format. Please provide a valid email address.",
    "any.required": "Email is required. Please provide an email address.",
  }),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Invalid phone number format. Please provide a valid phone number.",
      "any.required":
        "Phone number is required. Please provide a phone number.",
    }),
});

export default {
  addSchema,
};