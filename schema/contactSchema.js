const Joi = require('joi');

/** like type script typing data */
const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

module.exports = {
  contactsAddSchema,
};
