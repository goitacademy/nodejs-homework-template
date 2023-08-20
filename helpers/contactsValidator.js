const Joi = require("joi");

const contactValid = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });
  return schema.validate(data);
};

module.exports = contactValid;
