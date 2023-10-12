const Joi = require("joi");

const nameRegexp = /^.{2,30}$/;
const nameRegexpErrMessage = "The minimum length is 2 characters, and the maximum is 30 characters";
const phoneRegexp = /^\(\d{3}\) \d{3}-\d{4}$/; // Регулярное выражение для номера телефона
const phoneRegexpErrMessage = "The correct number format should be: (xxx) xxx-xxxx";
const emailRegexp = /^\S+@\S+\.\S+$/;
const emailRegexpErrMessage = "Invalid email format";

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).required().messages({
    "string.pattern.base": nameRegexpErrMessage,
    "any.required": "Missing required name field",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.email": emailRegexpErrMessage,
    "any.required": "Missing required email field",
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base": phoneRegexpErrMessage,
    "any.required": "Missing required phone field",
  }),
});

module.exports = {
    addSchema
};
