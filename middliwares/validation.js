const { contactsSchema } = require('../schemas');
const { AppError } = require('../utils');

const bodyValidation = (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body);
  if (error) {
    return next(new AppError(400, 'missing required name field'));
  }
  req.body = value;
  next();
};

module.exports = bodyValidation;
