const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./models/contacts");

const listContactsHandler = (req, res) => {
  const contacts = listContacts();
  return res.status(200).json(contacts);
};

const getContactByIdHandler = (req, res) => {
  const contact = getContactById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(contact);
};

const addContactHandler = (req, res) => {
  const newContact = addContact(req.body);
  if (!newContact) {
    return res.status(400).json({ message: "Missing require fields" });
  }
  return res.status(201).send(newContact);
};

const removeContactHandler = (req, res) => {
  const removedContact = removeContact(req.params.id);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const updateContactHandler = (req, res) => {
  const modifiedContact = updateContact(req.params.id, req.body);
  if (!modifiedContact) {
    return res.status(400).json({ message: "Missing fields" });
  }
  return res.status(200).json(modifiedContact);
};

module.exports = {
  listContactsHandler,
  getContactByIdHandler,
  addContactHandler,
  removeContactHandler,
  updateContactHandler,
};
