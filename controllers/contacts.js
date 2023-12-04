

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");



const getAll = async (req, res) => {
  const result = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).json();
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
