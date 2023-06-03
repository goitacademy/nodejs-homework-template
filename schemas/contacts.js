const Joi = require("joi");
const { isPossiblePhoneNumber } = require("libphonenumber-js");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: false }).required(),
  phone: Joi.string().custom((value, helpers) => {
    const isValid = isPossiblePhoneNumber(value);
    if (!isValid) {
      return helpers.error("any.invalid");
    }
    return value;
  }, "Custom Validation").required(),
});

module.exports = contactsAddSchema;