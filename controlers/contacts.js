const contacts = require("../models/contacts");
const errorHandler = require("../utilits/errorHandler");
const ctrlWrapper = require("../utilits/ctrlWraper");

const getList = async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.status(200).json({ contactsList });
};

const getById = async (req, res) => {
  const contact = await contacts.getContactById(req.params.contactId);

  errorHandler(404, "Not found");
  res.status(200).json(contact);

  if (!contact) {
    throw errorHandler(404, "Contact is not found");
  }
};

const postContact = async (req, res) => {
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const contact = await contacts.removeContact(contactId);

  if (!contact) {
    throw errorHandler(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

const update = async (req, res) => {
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  res.status(200).json(contact);

  if (!contact) {
    throw errorHandler(400, "missing fields");
  }
};

module.exports = {
  getList: ctrlWrapper(getList),
  getById: ctrlWrapper(getById),
  postContact: ctrlWrapper(postContact),
  update: ctrlWrapper(update),
  deleteContact: ctrlWrapper(deleteContact),
};
