const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),

  phone: Joi.required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

const addValidation = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.details[0].message,
    });
  }
  next();
};

module.exports = addValidation;
