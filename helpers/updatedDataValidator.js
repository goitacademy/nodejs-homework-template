const Joi = require("joi");

const updatedDataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }).or("name", "email", "phone");
  return schema.validate(data);
};

module.exports = updatedDataValidator;
