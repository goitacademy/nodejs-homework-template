import Joi from "joi";

const passwordPattern = "^[a-zA-Z0-9]{9,30}$";

export const userSignUpSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp(passwordPattern))
    .required()
    .messages({
      "string.pattern.base":
        "Password should contain minimum nine characters, at least one letter and one number.",
    }),
  email: Joi.string().email().required(),
});

export const userSignInSchema = Joi.object().keys({
  password: userSignUpSchema.extract("password"),
  email: userSignUpSchema.extract("email"),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
