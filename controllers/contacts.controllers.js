const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models");

const getContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ data: contacts });
};
const getContactByID = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.status(200).json({ data: contact });
};
const postContact = async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ data: newContact });
};
const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  await removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
};
const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  res.status(200).json({ data: updatedContact });
};

module.exports = {
  getContacts,
  getContactByID,
  postContact,
  deleteContact,
  putContact,
};
