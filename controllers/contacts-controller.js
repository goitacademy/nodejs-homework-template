const contactsService = require('../models/contacts');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../decorators');

const getAllContacts = async (req, res) => {
  const resultList = await contactsService.listContacts();
  res.json(resultList);
};

const getContactsById = async (req, res) => {
  const contactId = req.params.contactId;
  const getContactResult = await contactsService.getContactById(contactId);
  if (getContactResult === null) {
    throw HttpError(404);
  } else res.json(getContactResult);
};

const addContacts = async (req, res) => {
  const addContactResult = await contactsService.addContact(req.body);
  res.status(201).json(addContactResult);
};

const deleteContacts = async (req, res) => {
  const contactId = req.params.contactId;
  const deleteContactResult = await contactsService.removeContact(contactId);
  if (deleteContactResult === null) {
    throw HttpError(404);
  } else res.status(200).json({ message: 'contact deleted' });
};

const updateContacts = async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw HttpError(400);
  }
  const contactId = req.params.contactId;
  const updateContactResult = await contactsService.updateContact(
    contactId,
    req.body
  );
  if (!updateContactResult) {
    throw HttpError(404);
  } else res.json(updateContactResult);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContacts: ctrlWrapper(addContacts),
  deleteContacts: ctrlWrapper(deleteContacts),
  updateContacts: ctrlWrapper(updateContacts),
};
