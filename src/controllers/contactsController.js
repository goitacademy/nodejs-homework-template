const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../services/contactsService");

const getContactsController = async (req, res) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  const contacts = await getContacts(token);
  res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  const { id: contactId } = req.params;
  const contact = await getContactById(contactId, token);
  res.status(200).json(contact);
};

const addContactController = async (req, res) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  const { name, email, phone, favorite } = req.body;
  await addContact({ name, email, phone, favorite }, token);
  res.status(201).json({ message: "Contact created" });
};

const removeContactController = async (req, res) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  const { id: contactId } = req.params;
  await removeContact(contactId, token);
  res.status(200).json({ message: "Contact deleted" });
};

const updateContactController = async (req, res) => {
  const [tokenType, token] = req.headers["authorization"].split(" ");
  const { id: contactId } = req.params;
  const { name, email, phone, favorite } = req.body;
  await updateContact(contactId, { name, email, phone, favorite }, token);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
};
