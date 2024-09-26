const contacts = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
  console.log(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

const post = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const putById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Contact not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  post: ctrlWrapper(post),
  deleteById: ctrlWrapper(deleteById),
  putById: ctrlWrapper(putById),
};
