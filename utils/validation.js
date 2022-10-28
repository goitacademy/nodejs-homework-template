const Joi = require("joi");

const schemaCreatingContact = Joi.object({
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
  favorite: Joi.boolean().optional(),
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
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaUpdatingContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validateContactCreation = (obj) => schemaCreatingContact.validate(obj);
const validateUpdatingContact = (obj) => schemaUpdatingContact.validate(obj);
const validateUpdatingContactStatus = (obj) => schemaUpdatingContactStatus.validate(obj);

module.exports = {
  validateContactCreation,
  validateUpdatingContact,
  validateUpdatingContactStatus,
};
