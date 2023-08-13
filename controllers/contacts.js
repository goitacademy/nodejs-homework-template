const { HttpError } = require("../helpers/HttpError");
const { ctrlWrapper } = require("../helpers/ctrlWrapper");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../models/contacts");



const getAll = async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);

  if (!data) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

const add = async (req, res, next) => {
  const data = await addContact(req.body);
  res.status(201).json(data);
};

const updateById = async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  const data = await updateContact(contactId, body);

  if (!data) {
    throw HttpError(404, "Not Found");
  }
  res.json(data);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);

  if (!data) {
    throw HttpError(404, "Not Found");
  }

  res.json(data);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
