const joi = require("joi");

const contactSchema = joi.object({
  name: joi.string(),
  email: joi.string().email(),
  phone: joi.string(),
});

const userSchema = joi.object({
  password: joi.string().min(5),
  email: joi.string().email(),
  subscription: joi.string(),
  token: joi.string(),
});

const validator = (schema) => (body) => {
  return schema.validate(body, { abortEarly: false });
};

const contactValidate = validator(contactSchema);
const userValidate = validator(userSchema);

module.exports = { contactValidate, userValidate };
