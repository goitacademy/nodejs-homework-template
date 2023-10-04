const contactsOperations = require("../models/contacts.js");
const HttpError = require("../helpers/HttpError.js");

const { controllerWrapper } = require("../decorators/index.js");

const getAll = async (req, res) => {
  const r = await contactsOperations.listContacts();
  res.status(200).json(r);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const r = await contactsOperations.getContactById(contactId);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const add = async (req, res, next) => {
  const r = await contactsOperations.addContact(req.body);
  res.status(201).json(r);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const r = await contactsOperations.updateContact(contactId, req.body);
  if (!r) {
    throw HttpError(404);
  }
  res.json(r);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const r = await contactsOperations.removeContact(contactId);
  if (!r) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};
module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
};
