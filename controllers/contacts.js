const method = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const answer = await method.listContacts();
  res.json(answer);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const answer = await method.getContactById(contactId);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json(answer);
};

const add = async (req, res) => {
  const answer = await method.addContact(req.body);
  return res.status(201).json(answer);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const answer = await method.removeContact(contactId);
  if (!answer) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success!" });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const answer = await method.updateContact(contactId, req.body);
  if (!answer) {
    throw HttpError(404, "Not found");
  }

  res.json(answer);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
