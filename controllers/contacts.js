const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const { HTTPError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};
const getByID = async (req, res) => {
  const { contactId } = req.params;
  const contactByID = await getContactById(contactId);
  if (!contactByID) {
    throw HTTPError(404, "Not found");
  }
  res.json(contactByID);
};
const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};
const deleteByID = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    throw HTTPError(404, "Not found");
  }
  return res.status(200).json({ message: "contact deleted" });
};

const update = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    throw HTTPError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getByID: ctrlWrapper(getByID),
  add: ctrlWrapper(add),
  deleteByID: ctrlWrapper(deleteByID),
  update: ctrlWrapper(update),
};
