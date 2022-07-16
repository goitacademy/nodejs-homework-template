const Joi = require('joi');

const schemaContact = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
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

const patchContactSchema = (req, res, next) => {
  const patchSchemaContact = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const validationResult = patchSchemaContact.validate(req.body);

  if (validationResult.error) {
    return res.status(400).json({ message: 'missing field favorite' });
  }
  next();
};

module.exports = {
  createContactSchema,
  changeContactSchema,
  patchContactSchema,
};
