const Joi = require('joi');

const modelsContacts = require('../models/contacts');
const { ctrlWrapper, HttpError } = require('../utils');

const objectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

/**
 * @ GET /api/contacts
 * @param {*} req
 * @param {*} res
 */
const listContacts = async (req, res) => {
  const result = await modelsContacts.listContacts();
  res.status(200).json(result);
};

/**
 * @ POST /api/contacts
 * @param {*} req
 * @param {*} res
 */
const addContact = async (req, res) => {
  const { error } = objectSchema.validate(req.body);
  // const missedProperty = error.details[0].context.key;
  // console.log('------------->>>>>>>>>>>', error.details[0].context.key);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await modelsContacts.addContact(req.body);

  res.status(201).json(result);
};

/**
 * @ GET /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await modelsContacts.getContactById(contactId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.status(200).json(result);
};

/**
 * @ DELETE /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
const removeContact = async (req, res) => {
  const { contactId } = req.params;

  if (!contactId) {
    throw HttpError(404, 'Not found');
  }

  await modelsContacts.removeContact(contactId);
  res.json({ message: 'Contact deleted' });
};

/**
 * @ PUT /api/contacts/:contactId
 * @param {*} req
 * @param {*} res
 */
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
