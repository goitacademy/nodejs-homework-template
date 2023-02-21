const joi = require("joi");

const contactValidation = joi.object({
  name: joi.string().min(1),
  email: joi.string().email(),
  phone: joi.string().min(5),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const isContactValid = validator(contactValidation);
module.exports = { isContactValid };
