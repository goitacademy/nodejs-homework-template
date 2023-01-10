const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const contacts = await getContacts(userId);

  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await getContactById(contactId, userId);

  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone, favorite } = req.body;
  const { _id: userId } = req.user;
  await addContact({ name, email, phone, favorite }, userId);

  res.status(201).json({ message: "Contact created" });
};

const removeContactController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  await removeContact(contactId, userId);
  res.status(200).json({ message: "Contact deleted" });
};

const updateContactController = async (req, res) => {
  const { id: contactId } = req.params;
  const { _id: userId } = req.user;
  const { name, email, phone, favorite } = req.body;
  await updateContact(contactId, { name, email, phone, favorite }, userId);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
