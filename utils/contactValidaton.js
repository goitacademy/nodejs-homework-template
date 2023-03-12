const Joi = require("joi");

const createContactValidation = (data) =>
  Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(3).max(40).required(),
    phone: Joi.string()
      .regex(
        /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/
      )
      .required(),
  }).validate(data);
/** https://regexr.com/ */
module.exports = createContactValidation;
