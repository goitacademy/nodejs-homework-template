const Joi = require("joi");

const validateContact = (contact) => {
  const contactSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email(),
    phone: Joi.string().pattern(
      /^(\+|0)?((((\d{2})+[ -]?)?\d{3}[ -]?\d{3}[ -]?\d{3})|((((\+?\d{2})+[ -]?)?\d{3}[ -]?\d{2}[ -]?\d{2})))$/
    ),
  });
  return contactSchema.validate(contact);
};

module.exports = {
  validateContact,
};
