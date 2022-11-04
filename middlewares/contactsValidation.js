const Joi = require("joi");

const schemaForCreateOrUpdateContact = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[a-zA-Za-яА-Я]+(([' -][a-zA-Za-яА-Я ])?[a-zA-Za-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .trim()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string()
    .trim()
    .pattern(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/
    )
    .required(),
  favorite: Joi.boolean().optional(),
});

const schemaForUpdateContactStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const validation = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const [{ message }] = error.details;
    return res.status(400).json({
      message: message.replace(/"/g, ""),
    });
  }
  next();
};

const creatingContact = (req, res, next) =>
  validation(schemaForCreateOrUpdateContact, req, res, next);
const updatingContact = (req, res, next) =>
  validation(schemaForCreateOrUpdateContact, req, res, next);
const updatingContactStatus = (req, res, next) =>
  validation(schemaForUpdateContactStatus, req, res, next);

module.exports = {
  creatingContact,
  updatingContact,
  updatingContactStatus,
};
