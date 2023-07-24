const Joi = require("joi");
const { phoneRegexp, emailRegexp } = require("./regexp");
const contactPutSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(40)
    .messages({ "any.required": "missing required name field" }),
  email: Joi.string()
    .trim()
    .pattern(emailRegexp)
    .messages({ "any.required": "missing required email field" }),
  phone: Joi.string()
    .trim()
    .pattern(phoneRegexp)
    .messages({
      messages:
        "Invalid phone number format. Please fill a valid phone number (000) 000-0000.",
    })
    .messages({ "any.required": "missing required phone field" }),
  favorite: Joi.boolean(),
});
module.exports = { contactPutSchema };
