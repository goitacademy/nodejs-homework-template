const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers/");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) throw HttpError(404, "Not found");
  res.json(result);
};

const add = async (req, res) => {
  const result = await contacts.addContact(req.body);
  return res.status(201).json(result);
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({ message: "Contact deleted" });
};

const updateById = async (req, res) => {
  const isReqBody = Object.keys(req.body).length !== 0;
  if (!isReqBody) {
    throw HttpError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  return res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
  updateById: ctrlWrapper(updateById),
};
