const {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
  updateStatusContactService,
} = require("../services/contactsServices");

const { ctrlWrapper } = require("../utils/decorators");
const { HttpError } = require("../utils/errors");

const getContacts = async (req, res) => {
  const contacts = await getContactsService();

  if (!contacts) {
    throw new HttpError(404, "Not found");
  }

  res.json(contacts);
};

const getContact = async (req, res) => {
  const contact = await getContactService(req.params.contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.json(contact);
};

const addContact = async (req, res) => {
  const newContact = await addContactService(req.body);

  if (!newContact) {
    throw new HttpError(404, "Not found");
  }

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await updateContactService(id, req.body);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const id = req.params.contactId;
  const updatedContact = await updateStatusContactService(id, req.body);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const removeContact = async (req, res) => {
  const removedContact = await removeContactService(req.params.contactId);

  if (!removedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json(removedContact);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContact: ctrlWrapper(getContact),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
