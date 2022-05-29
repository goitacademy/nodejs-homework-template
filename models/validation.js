const Joi = require("joi");

const validation = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[A-Z]+ [A-Z]+$/i)
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.string()
      .pattern(/^[0-9 -]+$/, "numbers")
      .min(10)
      .max(16)
      .required(),
  });

  return schema.validate(data);
};

module.exports = validation;
