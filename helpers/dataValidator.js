const Joi = require("joi");

const dataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(5).max(16).required(),
  });
  return schema.validate(data);
};

module.exports = dataValidator;
