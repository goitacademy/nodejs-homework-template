const { CtrlWrapper, HttpErrors } = require("../helpers/");
const contactsMethods = require("../models/contacts");

const getAll = async (req, res, next) => {
  const list = await contactsMethods.listContacts();
  res.json(list);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await contactsMethods.getContactById(contactId);

  if (!contact) {
    throw HttpErrors(404, "Not found, man");
  }

  res.json(contact);
};

const addContact = async (req, res, next) => {
  const newContact = await contactsMethods.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const delContact = await contactsMethods.removeContact(contactId);

  if (!delContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(delContact);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const updContact = await contactsMethods.updateContact(contactId, req.body);

  if (!updContact) {
    throw HttpErrors(404, "Not found");
  }

  res.json(updContact);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  addContact: CtrlWrapper(addContact),
  deleteContact: CtrlWrapper(deleteContact),
  updateContact: CtrlWrapper(updateContact),
};
