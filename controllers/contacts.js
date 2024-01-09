const contactsMethods = require("../models/contacts");
const { HttpError, contactsCtrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contactsMethods.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsMethods.getContactById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contactsMethods.addContact(req.body);

  if (!result) throw HttpError(404, "Bad request");

  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsMethods.removeContact(contactId);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json("Contact deleted");
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await contactsMethods.updateContact(contactId, req.body);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: contactsCtrlWrapper(getAllContacts),
  getContactById: contactsCtrlWrapper(getContactById),
  addContact: contactsCtrlWrapper(addContact),
  deleteContact: contactsCtrlWrapper(deleteContact),
  updateContact: contactsCtrlWrapper(updateContact),
};