const Joi = require('joi');

const schemaContact = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const createContactSchema = (req, res, next) => {
  const validationResult = schemaContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: 'missing required name field' });
  }
  next();
};

const changeContactSchema = (req, res, next) => {
  const validationResult = schemaContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: 'missing fields' });
  }
  next();
};

module.exports = { createContactSchema, changeContactSchema };
