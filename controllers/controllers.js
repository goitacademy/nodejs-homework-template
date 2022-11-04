const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts.js");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
};
const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact === -1) {
    const error = new Error("Not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ data: contact });
};
const postContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ data: newContact });
};
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (deletedContact === -1) {
    const error = new Error("Not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ message: "contact deleted" });
};
const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (updatedContact === -1) {
    const error = new Error("Not found");
    error.status = 404;
    return next(error);
  }
  res.status(200).json({ data: updatedContact });
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
};
