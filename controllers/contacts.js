const {HttpError, ctrlWrapper} = require("../helpers")

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAll = async (req, res, next) => {
  const allContacts = await listContacts();
  res.json(allContacts)
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await getContactById(contactId);
  if (!getContact) {
    throw HttpError(404, "Not found");
  }
  res.json(getContact)
};

const add = async (req, res, next) => {
  const add = await addContact(req.body)
  res.status(201).json(add)
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const removeById = await removeContact(contactId);
  if (!removeById) {
    throw HttpError(404, "Not found");
  }
  res.json(removeById)
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const update = await updateContact(contactId, req.body);
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.json(update);
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
}
