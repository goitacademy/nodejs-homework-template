const Joi = require("joi");
const contactShema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomianSegments: 2,
      tlds: { allow: ["com", "net", "uk", "ua"] },
    })
    .required(),
  phone: Joi.number().required(),
});

module.exports = contactShema;
