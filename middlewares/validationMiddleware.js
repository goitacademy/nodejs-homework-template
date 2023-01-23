const {
  addContactSchema,
  updateContactSchema,
  updateStatusSchema,
  signupSchema,
  loginSchema,
  updateSubscriptionSchema,
} = require('../validation/validationJoiSchemas');

module.exports = {
  addContactValidation: (req, res, next) => {
    const { error } = addContactSchema.validate(req.body);

    if (error) res.status(400).json({ message: error?.details[0].message });

    next();
  },
  updateContactValidation: (req, res, next) => {
    const { error } = updateContactSchema.validate(req.body);

    if (error) res.status(400).json({ message: error?.details[0].message });

    next();
  },

  updateStatusValidation: (req, res, next) => {
    const { error } = updateStatusSchema.validate(req.body);

    if (error) res.status(400).json({ message: 'Missing field favorite' });

    next();
  },

  signupValidation: (req, res, next) => {
    const { error } = signupSchema.validate(req.body);

    if (error) res.status(400).json({ message: error.message });

    next();
  },
  loginValidation: (req, res, next) => {
    const { error } = loginSchema.validate(req.body);

    if (error) res.status(400).json({ message: error.message });

    next();
  },
  updateSubscriptionValidation: (req, res, next) => {
    const { error } = updateSubscriptionSchema.validate(req.body);

    if (error) res.status(400).json({ message: 'Missing field subscription' });

    next();
  },
};
