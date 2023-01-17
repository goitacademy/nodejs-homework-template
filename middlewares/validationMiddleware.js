const Joi = require('joi');

module.exports = {
  addContactValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net', 'ca', 'co.uk'] },
        })
        .required(),
      phone: Joi.string()
        .pattern(
          // eslint-disable-next-line prefer-regex-literals
          new RegExp('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')
        )
        .required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: validationResult.error.message });
    }

    next();
  },
};
