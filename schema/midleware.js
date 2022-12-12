const Joi = require("joi");

exports.contact = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(8).max(14),
});
