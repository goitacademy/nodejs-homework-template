const contacts = require("../models/contacts");

const { HttpError, ctrlWrap } = require("../helpers");



const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).res.json(result);
};

module.exports = {
  getAll: ctrlWrap(getAll),
  getById: ctrlWrap(getById),
  add: ctrlWrap(add),
  remove: ctrlWrap(remove),
  updateByID: ctrlWrap(updateByID),
};
