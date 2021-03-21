const Joi = require('joi');

const { HttpCode } = require('../../../helpers/constans');
const mongoose = require('mongoose');
// const phoneVal = Joi.extend(require('joi-phone-number'));

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  // email: Joi.string()
  //   .required()
  //   .email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ['com', 'net'] },
  //   }),
  // phone: phoneVal
  //   .string()
  //   .required()
  //   .phoneNumber({ defaultCountry: 'BE', format: 'national' }),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/\(\d{3}\)\s\d{3}-\d{4}/),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  // email: Joi.string()
  //   .optional()
  //   .email({
  //     minDomainSegments: 2,
  //     tlds: { allow: ['com', 'net'] },
  //   }),
  // phone: phoneVal.string().phoneNumber({
  //   defaultCountry: 'UA',
  //   format: 'international',
  //   strict: true,
  // }),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
}).min(1);

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  // console.log('schema>>>>>', schema.validate(obj));
  // console.log('ERROR>>>>>', error);
  if (error) {
    const [{ message }] = error.details;
    return next({
      status: 400,
      message: `Filed: ${message.replace(/"/g, '')}`,
    });
  }
  next();
};

module.exports.id = (req, res, next) => {
  const contactId = req.params.contactId;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      message: `Id: ${contactId} is not valid`,
    });
  }
  next();
};

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.updateContactVal = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
