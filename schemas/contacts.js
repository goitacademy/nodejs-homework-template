const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(33).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ca"] },
    })
    .required(),
  phone: Joi.string().min(5).max(14).required(),
});

module.exports = {
  addSchema,
};
