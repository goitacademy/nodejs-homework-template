const Joi = require("joi");

const addContactShema = Joi.object({
  name: Joi.string().alphanum().min(3).max(20).required(),
  phone: Joi.string().alphanum().min(10).max(12).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

module.exports = {
  addContactShema,
};
