const { HttpError, ctrlWrapper } = require('../helpers');

const contactsOperations = require('../models/contacts');

const listContacts = async (_, res) => {
 const contacts = await contactsOperations.listContacts();
 res.json(contacts);
};

const getContactById = async (req, res) => {
 const response = await contactsOperations.getContactById(req.params.contactId);
 if (!response) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json(response);
};

const addContact = async (req, res) => {
 const newContact = await contactsOperations.addContact(req.body);

 if (!newContact) {
  throw HttpError(404, 'Unable to add contact');
 }
 res.status(201).json(newContact);
};

const removeContact = async (req, res) => {
 const response = await contactsOperations.removeContact(req.params.contactId);
 if (!response) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json({ message: 'contact deleted' });
};
const updateContact = async (req, res) => {
 const updatedContact = await contactsOperations.updateContact(req.params.contactId, req.body);
 if (!updatedContact) {
  throw HttpError(404, 'Not Found');
 }
 res.status(200).json(updatedContact);
};

module.exports = {
 listContacts: ctrlWrapper(listContacts),
 getContactById: ctrlWrapper(getContactById),
 addContact: ctrlWrapper(addContact),
 removeContact: ctrlWrapper(removeContact),
 updateContact: ctrlWrapper(updateContact),
};
