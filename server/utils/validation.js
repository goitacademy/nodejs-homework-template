import Joi from "joi";

export const userRegisterSchema = Joi.object().keys({
  username: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(25)
    .trim()
    .required()
    .messages({
      "string.base": "Username must be a string",
      "string.pattern.base": "Username must only contain letters",
      "string.min": "Username must contain at least 3 characters",
      "string.max": "Username must contain max 25 characters",
      "any.required": "Username is required",
    }),

  email: Joi.string().email().trim().required().messages({
    "string.base": "E-mail must be a string",
    "string.email": "Enter a valid e-mail address",
    "any.required": "E-mail is required",
  }),

  password: Joi.string()
    .pattern(/[A-Za-z]/, "Password must contain at least one letter")
    .pattern(/\d/, "Password must contain at least one number")
    .min(8)
    .trim()
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must contain at least 8 characters",
      "any.required": "Password is required",
    }),
});

export const userLoginSchema = Joi.object().keys({
  email: Joi.string().email().trim().required().messages({
    "string.base": "E-mail must be a string",
    "string.email": "Enter a valid e-mail address",
    "any.required": "E-mail is required",
  }),

  password: Joi.string()
    .pattern(/[A-Za-z]/, "Password must contain at least one letter")
    .pattern(/\d/, "Password must contain at least one number")
    .min(8)
    .trim()
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.min": "Password must contain at least 8 characters",
      "any.required": "Password is required",
    }),
});

export const userLogoutSchema = Joi.object({}).unknown(false).messages({
  "object.unknown": "Body must be empty",
});

export const userSubSchema = Joi.object().keys({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .trim()
    .required()
    .messages({
      "string.base": "Subscription must be a string",
      "any.required": "Missing field subscription",
      "any.only":
        "Subscription must be one of these values - [starter, pro, business]",
    }),
});

export const userAvatarSchema = Joi.string().trim().messages({
  "string.base": "Avatar name must be a string",
  "any.required": "Missing avatar name",
});

export const contactSchema = Joi.object().keys({
  name: Joi.string()
    .pattern(/^[A-Za-z\s]+$/)
    .min(3)
    .max(25)
    .trim()
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.pattern.base": "Name must only contain letters",
      "string.min": "Name must contain at least 3 characters",
      "string.max": "Name must contain max 25 characters",
      "any.required": "Name is required",
    }),

  email: Joi.string().email().trim().messages({
    "string.base": "E-mail must be a string",
    "string.email": "Enter a valid e-mail address",
  }),

  phone: Joi.string()
    .pattern(/^[0-9\s+\-()]+$/)
    .min(3)
    .max(16)
    .trim()
    .required()
    .messages({
      "string.base": "Phone must be a string",
      "string.pattern.base":
        "Phone must only contain numbers, spaces, plus signs, hyphens and parentheses",
      "string.min": "Phone must contain at least 3 characters",
      "string.max": "Phone must contain max 16 characters",
      "any.required": "Phone is required",
    }),
});

export const contactFavSchema = Joi.object().keys({
  favorite: Joi.boolean().required().messages({
    "boolean.base": "Favorite must be a boolean",
    "any.required": "Missing field favorite",
  }),
});
