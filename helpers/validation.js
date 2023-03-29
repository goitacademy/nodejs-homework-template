const Joi = require('joi');
const CustomJoi = Joi.extend(require('joi-phone-number'));

const contactAddValidation = CustomJoi.object({
  name: CustomJoi.string().min(3).max(30).required(),

  email: CustomJoi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),

  phone: CustomJoi.string().phoneNumber({ format: 'international' }).required(),
});

const contactUpdateValidation = CustomJoi.object({
  name: CustomJoi.string().min(3).max(30),

  email: CustomJoi.string().email({
    minDomainSegments: 2,
  }),

  phone: CustomJoi.string().phoneNumber({ format: 'international' }),
}).min(1);

module.exports = {
  contactAddValidation,
  contactUpdateValidation,
};
