const contactsHandlers = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await contactsHandlers.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsHandlers.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const newcontact = await contactsHandlers.addContact(req.body);
  res.status(201).json(newcontact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsHandlers.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const updateContact = await contactsHandlers.updateContact(
    contactId,
    req.body
  );

  if (!updateContact) {
    throw HttpError(404, "Not found");
  }
  res.json(updateContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
