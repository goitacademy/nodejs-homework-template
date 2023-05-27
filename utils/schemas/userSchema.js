const Joi = require("joi");

const passwordPattern =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const emailPattern = /^(?!\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const passwordErrorMessage =
  "A password must contain at least eight characters, including at least one number and includes both lower and uppercase letters and special characters, for example #, ?, !";

const emailErrorMessage =
  "Invalid email format. Please enter a valid email address.";

const userSchema = Joi.object({
  password: Joi.string()
    .pattern(passwordPattern)
    .messages({
      "string.pattern.base": passwordErrorMessage,
    })
    .required(),
  email: Joi.string()
    .pattern(emailPattern)
    .messages({ "string.pattern.base": emailErrorMessage })
    .required(),
  subscription: Joi.string(),
  token: Joi.string(),
});

module.exports = userSchema;
