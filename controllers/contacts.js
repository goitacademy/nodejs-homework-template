const contacts = require("../models/contacts");

const { HttpError, CtrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const result = await contacts.getContactById(`${id}`);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

const addContacts = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
const deleteContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAllContacts: CtrlWrapper(getAllContacts),
  getContactById: CtrlWrapper(getContactById),
  addContacts: CtrlWrapper(addContacts),
  deleteContactById: CtrlWrapper(deleteContactById),
  updateContact: CtrlWrapper(updateContact),
};
