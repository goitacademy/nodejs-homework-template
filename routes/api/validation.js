const Joi = require("joi");

const namePattern = /[A-Z]\w+/;
const phonePattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

const schemaContact = Joi.object({
  name: Joi.string().regex(namePattern).min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "uk"] },
    })
    .required(),
  phone: Joi.string().pattern(phonePattern).required(),
});

const validate = async (schema, body, next) => {
  try {
    await schema.validateAsync(body);
    next();
  } catch (err) {
    next({ status: 400, message: `Field ${err.message.replace(/"/g, "")}` });
  }
};

module.exports.validateContact = (req, _res, next) => {
  return validate(schemaContact, req.body, next);
};
