const Joi = require("joi");

const addContactAndUpdateSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "co", "ua", "uk"] },
  }),
  phone: Joi.number().min(10).required(),
  favorite: Joi.boolean().required(),
});

module.exports = {
  addContactAndUpdateSchema,
};
