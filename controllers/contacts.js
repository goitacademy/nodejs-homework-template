const { HtthError, CtrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.json(result);
};

const addContacts = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContacts = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.status(200).json(result);
};

const updateContacts = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HtthError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContacts: CtrlWrapper(addContacts),
  deleteContacts: CtrlWrapper(deleteContacts),
  updateContacts: CtrlWrapper(updateContacts),
};
