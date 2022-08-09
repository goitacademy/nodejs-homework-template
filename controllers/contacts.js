const { json } = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContactById,
  updateStatusContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  let { page = 1, limit = 20, favorite: fav = true & false } = req.query;
  limit = limit > 20 ? 20 : limit;

  const contacts = await getContacts(userId, { page, limit, fav });
  res.json({ contacts, page, limit });
};

const getContactByIdController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await getContactById(contactId, userId);

  res.json({ contact, status: "succes" });
};

const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, email, phone } = req.body;
  await addContact({ name, email, phone }, userId);

  res.json({ status: "success" });
};

const updateContactController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const { name, email, phone } = req.body;
  await updateContact(contactId, { name, email, phone }, userId);

  res.json({ status: "success" });
};

const removeContactController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  await removeContactById(contactId, userId);

  res.json({ status: "success" });
};

const updateStatusContactController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  if (!req.body) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const { favorite } = req.body;
  await updateStatusContact(contactId, { favorite }, userId);

  res.json({ status: "success" });
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  updateContactController,
  removeContactController,
  updateStatusContactController,
};
