const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers/index");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const result = await contacts.getContactById(req.params.id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const apdateById = async (req, res, next) => {
  const result = await contacts.apdateContactById(req.params.id, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  //   res.status(204).send();

  res.json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  apdateById: ctrlWrapper(apdateById),
  deleteById: ctrlWrapper(deleteById),
};
