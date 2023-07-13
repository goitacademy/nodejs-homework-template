const Joi = require("joi");

const emailRegEx =
  /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d].{8,30}$/;
const subscriptionTypes = ["starter", "pro", "business"];

const registerSchema = Joi.object(
  {
    name: Joi.string(),
    password: Joi.string()
      .min(8)
      .max(30)
      .pattern(passwordRegEx)
      .required()
      .messages({
        "string.pattern.base":
          "Password should contain at least one uppercase letter, one lowercase letter, one number and one special character",
        "string.min": "Password shoud be at least 8 characters",
        "string.max": "Password shoul be less than 30 characters",
      }),
    email: Joi.string().pattern(emailRegEx).required(),
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const loginSchema = Joi.object(
  {
    password: Joi.string().min(8).required(),
    email: Joi.string().pattern(emailRegEx).required().messages({
      "string.pattern.base": "You have misprint in your email",
    }),
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const subscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

const userSchema = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
module.exports = userSchema;