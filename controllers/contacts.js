const {Contact } = require("../models");

const { ctrlWrapper, handle404error } = require("../helpers");
const getAll = async (req, res) => {
  const contacts = await Contact.listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.getContactById(contactId);
  if (!contact) {
    handle404error();
  }
  res.status(200).json(contact);
};
const add = async (req, res) => {
  const result = await Contact.addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.removeContact(contactId);
  if (!result) {
    handle404error();
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.updateContact(contactId, req.body);
  if (!result) {
    handle404error();
  }
  res.status(200).json(result);
};

const updateStatus = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.updateStatusContact(contactId, req.body);
  if (!result) {
    handle404error();
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
  updateStatus: ctrlWrapper(updateStatus),
};
