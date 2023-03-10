const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const helper = require("../helpers");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw helper.HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const create = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw helper.HttpError(404, "Not found");
  }
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  }
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw helper.HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: helper.ctrlWrapper(getAll),
  getById: helper.ctrlWrapper(getById),
  create: helper.ctrlWrapper(create),
  remove: helper.ctrlWrapper(remove),
  update: helper.ctrlWrapper(update),
};
