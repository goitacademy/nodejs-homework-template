const contacts = require("../models/contacts");
const { HtppError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HtppError(404, "Not found");
  }
  res.status(200).json(result);
};

const postContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HtppError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HtppError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  postContact: ctrlWrapper(postContact),
  deleteContactById: ctrlWrapper(deleteContactById),
  updateContactById: ctrlWrapper(updateContactById),
};
