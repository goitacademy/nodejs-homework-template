const Joi = require('joi');
// 067-555-55-55
const joiContactsShema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().pattern(
    new RegExp('^[(]{1}[0-9]{3}[)]{1} [0-9]{3}-[0-9]{4}$'),
  ),
  email: Joi.string().email({ tlds: { allow: false } }),
});

module.exports = joiContactsShema;
