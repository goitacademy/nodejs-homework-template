const contacts = require("../models/contacts");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) throw HttpError(404, "Not Found");

  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) throw HttpError(404, "Not Found");

  res.json({ message: "contact deleted" });
};

const addContact = async (req, res) => {
  console.log(req.body);
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) throw HttpError(404, "Not Found");

  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
