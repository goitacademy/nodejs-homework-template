const Joi = require("joi");

const dataValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3)
    .max(30).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(5)
    .max(12).required(),
  });

  
  
  return schema.validate(data);
};

module.exports = dataValidator;
