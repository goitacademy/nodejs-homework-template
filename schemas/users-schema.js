import Joi from "joi";

export const authSchema = Joi.object({
  password: Joi.string().required().min(8).messages({
    "string.base": "Must be a string",
    "string.min": "Min length 8 symbols",
    "any.required": "Field is required",
  }),
  email: Joi.string()
    .required()
    .pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .messages({
      "any.required": "Field is required",
      "string.base": "Must be a string",
      "string.pattern.base":
        "Does not match the required format: test@mail.com",
    }),
});

export const patchSubscription = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").messages({
    "any.only": "Subscription must be one of: starter, pro, business",
  }),
});
