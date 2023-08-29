const contacts = require("../models/contacts");
const { httpError } = require("../utils/httpError");
const { controlWrapper } = require("../utils/controlWrapper");

const getAllContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

const addNewContact = async (req, res) => {
  const { body } = req;
  const result = await contacts.addContact(body);

  if (!result) {
    throw httpError(400, "Bad request");
  }
  res.status(201).json(result);
};

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await contacts.updateContact(contactId, body);
  if (!result) {
    throw httpError(404, "Not Found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: controlWrapper(getAllContacts),
  getContactById: controlWrapper(getContactById),
  addNewContact: controlWrapper(addNewContact),
  removeContactById: controlWrapper(removeContactById),
  updateContactById: controlWrapper(updateContactById),
};
