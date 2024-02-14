const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string().min(3),
  email: joi.string().email(),
  phone: joi.string().min(5),
  favorite: joi.boolean(),
});

const validator = (schema) => (body) => {
  return schema.validate(body);
};

const contactValidator = validator(contactSchema);

const userSchema = joi.object({
  email: joi.string().email(),
  password: joi.string(),
});

const userValidator = validator(userSchema);

module.exports = { contactValidator, userValidator };
