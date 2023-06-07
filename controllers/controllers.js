const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const { ApiError, decorCtrWrapper } = require("../utils");

const getAll = async (_, res) => {
  const response = await listContacts();

  res.json({ data: response });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const response = await getContactById(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ data: response });
};

const add = async (req, res) => {
  const { body } = req;

  const response = await addContact(body);

  res.status(201).json({ data: response });
};

const editById = async (req, res) => {
  const { body } = req;
  const { contactId } = req.params;

  const response = await updateContact(contactId, body);

  if (!response) throw ApiError(404, "Not found");

  res.json({ data: response });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const response = await removeContact(contactId);

  if (!response) throw ApiError(404, "Not found");
  res.json({ message: "contact deleted" });
};

module.exports = {
  getAll: decorCtrWrapper(getAll),
  getById: decorCtrWrapper(getById),
  add: decorCtrWrapper(add),
  editById: decorCtrWrapper(editById),
  deleteById: decorCtrWrapper(deleteById),
};
