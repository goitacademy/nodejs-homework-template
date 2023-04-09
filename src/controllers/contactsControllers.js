const Joi = require('joi');
const { HttpError } = require('../helpers');
const service = require('../models/contacts');
const ctrlWrapper = require('../decorators/ctrlWrapper');

const { contactSchema } = require('../schemas');
const addSchema = Joi.object(contactSchema);

const getContactsController = async (_, res) => {
  const contacts = await service.getContacts();
  res.status(200).json(contacts);
};

const getContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await service.getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const validationResult = addSchema.validate(req.body);

  if (validationResult.error) {
    throw new HttpError(400, validationResult.error.message);
  }

  const createdContact = await service.addContact(req.body);
  res.status(201).json(createdContact);
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updatedContact = await service.updateContact(contactId, req.body);
  const validationResult = addSchema.validate(req.body);

  if (Object.keys(req.body).length === 0) {
    throw new HttpError(400, 'missing fields');
  }

  if (validationResult.error) {
    throw new HttpError(400, validationResult.error.message);
  }

  if (!updatedContact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.status(200).json(updatedContact);
};

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await service.removeContact(contactId);

  if (!deletedContact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }

  res.status(200).json({
    message: 'contact deleted',
    contact: deletedContact,
  });
};

module.exports = {
  getContactsController: ctrlWrapper(getContactsController),
  getContactController: ctrlWrapper(getContactController),
  addContactController: ctrlWrapper(addContactController),
  updateContactController: ctrlWrapper(updateContactController),
  removeContactController: ctrlWrapper(removeContactController),
};
