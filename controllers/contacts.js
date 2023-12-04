const {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
} = require("../models/contacts");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({
    message: "Delete succenss ",
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

module.exports = {
  getById: ctrlWrapper(getById),
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
