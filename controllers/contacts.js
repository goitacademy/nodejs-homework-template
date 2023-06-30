const contacts = require("../models/contacts");

const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) throw HttpError(404, "Not Found");
  res.json({
    message: "Delete success",
  });
};

const changeContacts = async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, name, email, phone);
  if (!result) throw HttpError(404, "Not Found");
  res.json(result);
};

const addContacts = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
  res.status(201).json(result);
};
module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  changeContacts: ctrlWrapper(changeContacts),
  deleteContacts: ctrlWrapper(deleteContacts),
  addContacts: ctrlWrapper(addContacts),
};
