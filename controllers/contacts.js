const contacts = require("../models/contacts");
const HttpError = require("../controllers/ctrlWrapper");
const ctrlWrapper = require("../controllers/ctrlWrapper");
const { nanoid } = require("nanoid");

const listContacts = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = { id: nanoid(), name, email, phone };
  const createdContact = await contacts.addContact(newContact);
  res.status(201).json(createdContact);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const removedContact = await contacts.removeContact(contactId);
  if (!removedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await contacts.updateContact(contactId, {
    name,
    email,
    phone,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not found");
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
