const { contactsSchema } = require('../schemas');

const bodyValidation = (req, res, next) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: 'missing required name field',
      error: error.message,
    });
  }
  next();
};

module.exports = bodyValidation;
