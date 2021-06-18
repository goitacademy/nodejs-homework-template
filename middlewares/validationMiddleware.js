const Joi = require('joi');

function addContactValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    phone: Joi.string()
      .regex(/^[()0-9]/)
      .min(7)
      .max(13)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res
      .status(400)
      .json({ status: validationResult.error.details[0].message });
  }

  next();
}

function patchContactValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string()
      .regex(/^[()0-9]/)
      .min(7)
      .max(13)
      .optional(),
  }).required();

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
}
module.exports = {
  patchContactValidation,
  addContactValidation,
};
