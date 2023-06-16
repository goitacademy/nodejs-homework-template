const Joi = require("joi");
// const PHONE_REGEX = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/im;
exports.createContactsDataValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "co", "uk"] } })
        .required(),
    })
    .validate(data);
