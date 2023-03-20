const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const contactScheme = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: myCustomJoi.string().required().phoneNumber(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

module.exports = contactScheme;
