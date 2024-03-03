const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .required()
    .messages({
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not be more than 30 characters",
      "string.pattern.base":
        "Name must contain only letters and spaces between words",
      "any.required": "Name is required",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid phone format. Use XXX-XXX-XXX",
      "any.required": "Phone is required",
    }),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .messages({
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not be more than 30 characters",
      "string.pattern.base":
        "Name must contain only letters and spaces between words",
    }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/)
    .messages({
      "string.pattern.base": "Invalid phone format. Use XXX-XXX-XXX",
    }),
  favorite: Joi.boolean(),
});
const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Favorite status is required",
  }),
});

const signupAndLoginSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters",
      "string.max": "Password must not be more than 30 characters",
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one lowercase letter",
      "any.required": "Password is required",
    }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
});
const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
});

module.exports = {
  addContactSchema,
  updateContactSchema,
  updateContactStatusSchema,
  signupAndLoginSchema,
  emailSchema,
};
