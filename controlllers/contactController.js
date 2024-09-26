const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper, contactValidator } = require("../helpers");

const getAll = async (req, res) => {
  const data = await contacts.listContacts();
  res.status(200).json(data);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) {
    return next(HttpError(400, "Missing required name field"));
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const update = async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) {
    return next(HttpError(404, "Invalid data"));
  }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);

  if (!result) {
    return next(HttpError(400, "Missing fields"));
  }
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    return next(HttpError(404, "Not found"));
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
