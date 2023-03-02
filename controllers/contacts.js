const { HttpError, ctrlWrapper } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  console.log(contactId);
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
  next(error);
};

const add = async (req, res, next) => {
  const { error } = addSchemaforPost.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = addSchemaforPut.validate(req.body);
  const length = Object.keys(req.body).length;

  if (length === 0) {
    throw HttpError(400, "No body");
  }

  if (error) {
    throw HttpError(400, "missing fields");
  }

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
