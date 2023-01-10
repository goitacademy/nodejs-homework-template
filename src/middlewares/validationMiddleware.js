const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
      phone: Joi.number().integer().min(7).required(),
    });

    const validatedResult = schema.validate(req.body);
    if (validatedResult.error) {
      return res.status(400).json({ message: validatedResult.error.details });
    }
    next();
  },
};
