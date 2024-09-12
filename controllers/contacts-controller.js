const contactsService = require('../models/contactsService/contactsService.js');

const { HttpError } = require('../helpers');

const { controllerWrapper } = require('../decorators');

const listContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not Found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Contact removed',
  });
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
  removeContact: controllerWrapper(removeContact),
};
