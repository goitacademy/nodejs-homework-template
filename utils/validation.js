const Joi = require("joi");

const schemaAddingContact = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "pl", "eu", "fm", "to", "se"],
      },
    }),
  phone: Joi.string()
    .trim()
    .pattern(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
    ),
});

const schemaUpdatingContact = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .optional(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net", "pl", "eu", "fm", "to", "se"],
      },
    })
    .optional(),
  phone: Joi.string()
    .trim()
    .pattern(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
    )
    .optional(),
}).min(1);

const validationForAddingContact = (obj) => schemaAddingContact.validate(obj);
const validationForUpdatingContact = (obj) =>
  schemaUpdatingContact.validate(obj);

module.exports = {
  validationForAddingContact,
  validationForUpdatingContact,
};
