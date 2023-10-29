const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);

  if (!contact) throw HttpError({ status: 404, message: "Not found" });

  res.json(contact);
};

const add = async (req, res) => {
  const { body } = req;

  const contact = await contacts.addContact(body);

  res.status(201).json(contact);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);

  if (!contact) throw HttpError({ status: 404, message: "Not found" });

  res.json(contact);
};

const updateById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const updatedContact = await contacts.updateContact(contactId, body);

  res.json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
