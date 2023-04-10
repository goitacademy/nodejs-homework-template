const { ctrlWrapper } = require("../utils");
const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json({ result });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json({ result });
};
const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const updateContactbyID = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateByID(contactId, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json(result);
};
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id: ${contactId} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactbyID: ctrlWrapper(updateContactbyID),
  deleteContactById: ctrlWrapper(deleteContactById),
};
