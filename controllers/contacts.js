const { httpError, tryCatch } = require("../helpers");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getAllContacts = async (req, res) => {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (!contact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await removeContact(id);
  if (!deletedContact) {
    throw httpError(404, "Not found");
  }
  res.status(200).json({ massage: "contact deleted" });
};

const update = async (req, res) => {
  const { id } = req.params;
  const updatedContactById = await updateContact(id, req.body);
  if (!updatedContactById) {
    throw httpError(404, "Not Found");
  }
  res.status(200).json(updatedContactById);
};

module.exports = {
  getAllContacts: tryCatch(getAllContacts),
  getById: tryCatch(getById),
  add: tryCatch(add),
  deleteById: tryCatch(deleteById),
  update: tryCatch(update),
};
