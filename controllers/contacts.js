const db = require("../models/contacts");

const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../helpers/ctrlWrapper");

const getAll = async (req, res) => {
  const result = await db.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await db.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;

  const deleteContact = await db.removeContact(contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const add = async (req, res) => {
  const result = await db.addContact(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  const body = req.body;
  const { contactId } = req.params;

  const update = await db.updateContact(contactId, body);
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
};
