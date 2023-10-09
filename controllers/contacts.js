const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const data = await listContacts();
  res.json(data);
};

const getById = async (req, res) => {
  const data = await getContactById(req.params.contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.json(data);
};

const add = async (req, res) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const updateById = async (req, res) => {
  const { name, phone, email } = req.body;
  const newContact = Object.assign(
    {},
    name && { name },
    phone && { phone },
    email && { email }
  );

  const data = await updateContact(req.params.contactId, newContact);

  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(data);
};

const deleteById = async (req, res) => {
  const data = await removeContact(req.params.contactId);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};