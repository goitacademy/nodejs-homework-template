const operation = require('../../models/contacts');
const { HttpError } = require('../../helpers');
const Joi = require('joi');

const requestBodySchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const addContact = async (req, res) => {
  const { error } = requestBodySchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { id } = req.params;
  const result = await operation.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(201).json(result);
};

module.exports = addContact;
