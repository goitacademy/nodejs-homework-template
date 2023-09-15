const { contacts } = require("../models");

const { ctrlWrapper } = require("../helpers");
const { HttpError } = require("../helpers");

const getContacts = async (_, res) => {
  const response = await contacts.listContacts();

  res.status(200).json(response);
};

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const response = await contacts.getContactById(id);

  if (!response) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(response);
};

const addContact = async (req, res) => {
  const response = await contacts.addContact(req.body);

  res.status(201).json(response);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const response = await contacts.removeContact(id);

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const response = await contacts.updateContact(id, req.body);

  if (!response) {
    throw HttpError(404, "Not found");
  }

  res.status(201).json(response);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactsById: ctrlWrapper(getContactsById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
