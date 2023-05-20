const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org"] },
    })
    .required(),
  phone: Joi.string().min(3).max(15).required(),
});
const validator = (schema) => (body) => {
  return schema.validate(body, { abortEarly: false });
};

const contactValidate = validator(addSchema);

module.exports = { contactValidate };
