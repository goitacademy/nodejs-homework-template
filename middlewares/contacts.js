const { schema, favoriteSchema, subscriptionSchema } = require('../models/contacts');

const contactBody = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

const favorite = (req, res, next) => {
  const { error } = favoriteSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }
  next();
};

module.exports = { contactBody, favorite };
