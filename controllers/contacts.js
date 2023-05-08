const contacts = require("../models/contacts");
const { HttpErrors } = require("../helpers");
const addSchema = require("../shemas/addShemas");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpErrors(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpErrors(404);
  }
  res.status(200).json(result);
};
const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);
  res.status(201).json(result);
};

module.exports = {
  getAll,
  getById,
  addContact,
  deleteContact,
  updateContact,
};
