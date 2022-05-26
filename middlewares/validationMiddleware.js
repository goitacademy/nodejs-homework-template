const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),

  phone: Joi.required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

module.exports = {
  addValidation: async (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: validation.error.details[0].message,
      });
    }
    next();
  },
};
