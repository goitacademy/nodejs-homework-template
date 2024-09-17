const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  if (!result) throw HttpError(404, "Not found");

  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res, next) => {
  const contactBody = req.body;
  const { contactId } = req.params;
  const result = await updateContact(contactId, contactBody);

  if (!result) throw HttpError(404, "Not found");

  res.status(201).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  updateById: ctrlWrapper(updateById),
};
