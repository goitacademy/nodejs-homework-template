const { HttpError, cntrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json(result);
};
const add = async (req, res) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
  res.status(201).json(result);
};
const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json(result);
};
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "NOT found");
  }
  res.json({ message: "contact deleted" });
};
module.exports = {
  getAll: cntrlWrapper(getAll),
  getById: cntrlWrapper(getById),
  add: cntrlWrapper(add),
  updateById: cntrlWrapper(updateById),
  deleteById: cntrlWrapper(deleteById),
};
