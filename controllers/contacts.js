const contacts = require("../models/contacts");
const HttpError = require("../helpers/index");

const { addSchema, updateSchema } = require("../schemas/contacts-schemas");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};

const addNewContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateByIdContact = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await contacts.updateContactByID(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json(result);
};
const removeByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found`);
  }
  res.json({ message: "Delete success" });
};
module.exports = {
  getAll,
  getByIdContact,
  addNewContact,
  updateByIdContact,
  removeByIdContact,
};
