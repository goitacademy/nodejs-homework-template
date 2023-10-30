const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { HTTPError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");
const getAll = async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw HTTPError("Not found", 404);
  }
  res.status(200).json({ data: contact });
};
const add = async (req, res) => {
  const result = await addContact(req.body);
  if (!result) {
    throw HTTPError("missing required name field", 400);
  }
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HTTPError("Not found", 404);
  }
  res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HTTPError("Not found", 404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
  add: ctrlWrapper(add),
};
