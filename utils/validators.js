const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.number().min(5),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const contactValidator = validator(contactSchema);

module.exports = { contactValidator };
