const contacts = require("../models/contacts");

const { ctrlWrapper } = require("../utils");

const { HttpError } = require("../helpers");

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const result = await contacts.getContactById(req.params.id);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const result = await contacts.removeContact(req.params.id);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res ) => {
  const result = await contacts.updateContact(req.params.id, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
