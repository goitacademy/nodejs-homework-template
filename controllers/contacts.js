const { 
  listContacts, 
  getContactById, 
  addContact, 
  updateContact, 
  removeContact, 
} = require("../models/contacts");
const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
}

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  } 
  res.status(200).json(result);
}

const add = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
}

const updateById = async (req, res) => {
  const {contactId} = req.params;
  const result = await updateContact(contactId, req.body);
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  }
  res.status(200).json(result);
}

const updateStatus = async (req, res) => {
  const {contactId} = req.params;
}

const deleteById = async (req, res) => {
  const {contactId} = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    return res.status(404).json({ message: "Not found"});
  }
  res.status(200).json({ message: "Contact deleted"});
}

module.exports = {
  getAll: ctrlWrapper(getAll), 
  getById: ctrlWrapper(getById), 
  add: ctrlWrapper(add), 
  updateById: ctrlWrapper(updateById), 
  updateStatus: ctrlWrapper(updateStatus),
  deleteById: ctrlWrapper(deleteById),
}