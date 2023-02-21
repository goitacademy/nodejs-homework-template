const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");


const getContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
