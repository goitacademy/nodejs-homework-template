const contacts = require("../models/contacts");
const { ApiError, ctrlWrap } = require("../helpers");

const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw ApiError(404, "Not found");
  }
  res.status(200).json(result);
};
module.exports = {
  getContacts: ctrlWrap(getContacts),
  getContactsById: ctrlWrap(getContactsById),
  addContact: ctrlWrap(addContact),
  deleteContact: ctrlWrap(deleteContact),
  updateContactById: ctrlWrap(updateContactById),
};
