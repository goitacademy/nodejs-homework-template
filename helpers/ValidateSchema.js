const Joi = require("joi");


const ValidateSchema = (data) => {

  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .required()
      .messages({
        "any.required": `missing required name`,
        "string.empty": `name cannot be empty`,
      }),
    email: Joi.string()
      .required()
      .email()
      .messages({
        "any.required": `missing required title`,
        "string.empty": `email cannot be empty`,
        "string.email": `email cannot be a valid email address`
      }),
    phone: Joi.number()
      .required()
      .positive()
      .messages({
        "any.required": `missing required phone`,
        "number.empty": `phone cannot be empty`,
        "number.base": `phone must be valid phone number`,
        "number.positive": `phone cannot be negative`
      }),
  })

  return schema.validate(data);
}

module.exports = ValidateSchema;
