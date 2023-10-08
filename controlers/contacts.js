const contactHandlers = require("../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
  const allContacts = await contactHandlers.listContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const contact = await contactHandlers.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const createContact = async (req, res) => {
  const newContact = await contactHandlers.addContact(req.body);
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const contact = await contactHandlers.removeContact(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const contact = await contactHandlers.updateContact(
    req.params.contactId,
    req.body
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
