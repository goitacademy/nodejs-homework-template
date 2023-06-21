const contacts = require("../models");
const { ctrlWrapper, HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await contacts.addContact(name, email, phone);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");

    res.status(200).json({ message: "contact deleted" });
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const result = await contacts.updateContact(contactId, body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};
