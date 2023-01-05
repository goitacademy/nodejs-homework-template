const Joi = require("joi");

const addContactAndUpdateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number().min(10).required(),
});

module.exports = {
  addContactAndUpdateSchema,
};
