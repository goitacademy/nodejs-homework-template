const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string()
    .regex(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name can only consist of letters, apostrophes, dashes and spaces."
    )
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
    )
    .required(),
});

module.exports = contactsSchema;
