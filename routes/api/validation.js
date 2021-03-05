const Joi = require('joi');
const mongoose = require('mongoose');
const phoneVal = Joi.extend(require('joi-phone-number'));

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: phoneVal
    .string()
    .required()
    .phoneNumber({ defaultCountry: 'BE', format: 'national' }),
});
const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).optional(),
  email: Joi.string()
    .optional()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
  phone: phoneVal
    .string()
    .phoneNumber({
      defaultCountry: 'UA',
      format: 'international',
      strict: true,
    })
    .required(),
});

const validate = (schema, obj, next) => {
  const { error } = schema.validate(obj);
  if (error) {
    console.log('validation error', error);
    const [{ message }] = error.details;
    return next({
      status: 400,
      message,
    });
  }
  next();
};
module.exports.id = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).send('Invalid object id');
  }
  next();
};

module.exports.createContact = (req, res, next) => {
  return validate(schemaCreateContact, req.body, next);
};
module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};
