const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().min(7).required(),
});
const validator = schema => body => {
  return schema.validate(body);
};

const contactValidator = validator(contactSchema);

module.exports = { contactValidator };
