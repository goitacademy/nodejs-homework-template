const Joi = require('joi');

const modelsContacts = require('../models/contacts');
const { ctrlWrapper, HttpError } = require('../utils');

const objectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string.email().require(),
  phone: Joi.string().required(),
});

/**
 * @ GET /api/contacts
 * нічого не отримує
 * викликає функцію listContacts для роботи з json-файлом contacts.json
 * повертає масив всіх контактів в json-форматі зі статусом 200
 *
 * @param {*} req
 * @param {*} res
 */
const listContacts = async (req, res) => {
  const result = await modelsContacts.listContacts();
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const { error } = objectSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await modelsContacts.addContact(req.body);

  res.status(201).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!contactId) {
    throw HttpError(404, 'Not found');
  }

  const result = await modelsContacts.getContactById(contactId);
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;

  if (!contactId) {
    throw HttpError(404, 'Not found');
  }

  await modelsContacts.removeContact(contactId);
  res.status(204).json();
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error } = objectSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await modelsContacts.updateContact(contactId, body);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(202).json(result);
};

module.exports = {
  ctrlListContacts: ctrlWrapper(listContacts),
  ctrlAddContact: ctrlWrapper(addContact),
  ctrlGetContactById: ctrlWrapper(getContactById),
  ctrlRemoveContact: ctrlWrapper(removeContact),
  ctrlUpdateContact: ctrlWrapper(updateContact),
};
