const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const { ctrlWrapper, HttpError } = require("../helpers");

const notFoundError = () => HttpError(404, "Not found");

const getAll = async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
};

const getById = async ({ params: { contactId } }, res, next) => {
  const result = await getContactById(contactId);
  if (result === undefined || result === null) {
    throw notFoundError();
  }
  res.json(result);
};

const add = async ({ body }, res, next) => {
  const result = await addContact(body);
  res.status(201).json(result);
};

const remove = async ({ params: { contactId } }, res, next) => {
  const result = await removeContact(contactId);
  if (result === undefined || result === null) {
    throw notFoundError();
  }
  res.json({});
};

const updateById = async ({ params: { contactId }, body }, res, next) => {
  const result = await updateContact(contactId, body);
  if (result === undefined || result === null) {
    throw notFoundError();
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  updateById: ctrlWrapper(updateById),
};
