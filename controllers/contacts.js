const { NotFound } = require("http-errors");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const resultContacts = await listContacts();
  res.json(resultContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const resultContact = await getContactById(contactId);
  if (!resultContact) {
    throw new NotFound("Not found");
  }
  res.json(resultContact);
};

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const deletedResult = await removeContact(contactId);
  if (!deletedResult) {
    throw new NotFound("Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const updatedResult = await updateContact(contactId, req.body);
  if (!updatedResult) {
    throw new NotFound("Not found");
  }
  res.json(updatedResult);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
