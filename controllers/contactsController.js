const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");
const { addSchema } = require("../schemas/contacts");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getById(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  return res.status(201).json(result);
};

const update = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, { ...req.body });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteContact,
};
