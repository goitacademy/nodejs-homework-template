const {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
} = require("../services/contactsServices");

const { ctrlWrapper } = require("../utils/decorators");

const getContacts = async (req, res) => {
  const contacts = await getContactsService();
  res.status(200).json(contacts);
};

const getContact = async (req, res) => {
  const contact = await getContactService(req.params.contactId);
  console.log(contact);
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const newContact = await addContactService(req.body);
  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await updateContactService(id, req.body);

  res.status(200).json(updatedContact);
};

const removeContact = async (req, res) => {
  const removedContact = await removeContactService(req.params.contactId);
  res.status(200).json(removedContact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
