const { HttpErrors, CtrlWrapper } = require("../helpers");
const methods = require("../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await methods.listContacts();
  res.json(contacts);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await methods.getContactById(contactId);

  if (!contact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(contact);
};

const addContact = async (req, res, next) => {
  const newContact = await methods.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await methods.deleteContact(contactId);

  if (!deletedContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(deletedContact);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await methods.updateContact(contactId);
  if (!updatedContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(updatedContact);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContact: CtrlWrapper(addContact),
  deleteContact: CtrlWrapper(deleteContact),
  updateContact: CtrlWrapper(updateContact),
};
