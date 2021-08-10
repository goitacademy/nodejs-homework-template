/* eslint-disable semi */
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(1).max(50).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net'],
      },
    })
    .required(),

  phone: Joi.string()
    .min(10)
    .max(15)
    .pattern(/^[0-9]+$/)
    .required(),
  // eslint-disable-next-line semi
});

const validate = async (schema, contactObj, next) => {
  try {
    await schema.validateAsync(contactObj);
    return next();
  } catch (err) {
    next({ status: 400, message: err.message });
  }
};

module.exports = {
  validationContact: async (req, res, next) => {
    return await validate(contactSchema, req.body, next);
  },
};
