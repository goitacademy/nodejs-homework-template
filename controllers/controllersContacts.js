const data = require("../models/contacts");
const { RequestError, ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await data.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await data.getContactById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await data.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await data.removeContact(contactId);
  console.log(result);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await data.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};