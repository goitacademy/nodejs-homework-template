const db = require("../db/contacts");
const isValid = require("mongoose").Types.ObjectId.isValid;

const getAllContacts = async () => await db.getAll();

const getContactById = async (id) => {
  if (!isValid(id)) return false;
  return await db.getById(id);
};

const removeContact = async (id) => {
  if (!isValid(id)) return false;
  return await db.removeById(id);
};

const addContact = async ({ name, email, phone }) =>
  await db.add({ name, email, phone });

const updateContact = async (id, fields) => {
  if (!isValid(id)) return false;
  return await db.updateById(id, fields);
};

const updateContactStatus = async (id, body) => {
  if (!isValid(id)) return false;
  const { favorite } = body;
  return await db.updateStatus(id, favorite);
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};