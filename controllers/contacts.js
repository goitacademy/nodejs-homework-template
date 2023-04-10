const { controllerWrapper, checkId } = require("../helpers");

const contacts = require("../models/contacts");

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const result = await contacts.getById(req.params.contactId);
  checkId(result);
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res, next) => {
  const result = await contacts.removeContact(req.params.contactId);
  checkId(result);
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  const result = await contacts.updateContact(req.params.contactId, req.body);
  checkId(result);
  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getById: controllerWrapper(getById),
  addContact: controllerWrapper(addContact),
  deleteContact: controllerWrapper(deleteContact),
  updateContact: controllerWrapper(updateContact),
};
