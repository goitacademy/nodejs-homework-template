const Joi = require('joi');

exports.createContactValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ua', 'ru'] },
        })
        .required(),
      phone: Joi.string().min(9).max(20).required(),
    })
    .validate(data);
