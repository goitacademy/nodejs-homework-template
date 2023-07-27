import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'uk'] } }).required(),
  phone: Joi.string().pattern(/\+?\d{1,4}?[-.\s]?[- ]?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/).required().messages({"string.pattern.base": "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +",}),
});

export default {
  contactsAddSchema,
};