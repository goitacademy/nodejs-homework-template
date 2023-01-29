const serviceContact = require("../services/contactsService");

const listContactsController = async (req, res, next) => {
  const contacts = await serviceContact.listContacts();
  res.status(200).json({ contacts, status: "success" });
};

const getContactByIdController = async (req, res, next) => {
  const contactId = await serviceContact.getContactById(req.params.id);
  res.status(200).json({ contactId, status: "success" });
};

const addContactController = async (req, res, next) => {
  const newContacts = await serviceContact.addContact(req.body);
  res.status(201).json({ newContacts, status: "success" });
};

const removeContactController = async (req, res, next) => {
  await serviceContact.removeContact(req.params.id);

  res.status(200).json({ status: "success" });
};

const updateContactController = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  await serviceContact.updateContact(id, body);
  res.status(200).json({ status: "success" });
};

const favoriteContactController = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  await serviceContact.favoriteContact(id, body);
};

module.exports = {
  listContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  favoriteContactController,
};
