const { HttpError } = require("../helpers");
const {
  getContactService,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res) => {
  const contacts = await getContactService();
  res.json(contacts);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return res.json(contact);
};

const postContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updatedContact = await updateContact(contactId, req.body);

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.status(200).json(updatedContact);
};

module.exports = {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  putContact,
};
