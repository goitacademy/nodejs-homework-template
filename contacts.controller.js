const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./models/contacts");

const listContactsHandler = async (req, res) => {
  try {
    const contacts = await listContacts();
    return res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Wystąpił błąd serwera." });
  }
};

const getContactByIdHandler = async (req, res) => {
  try {
    const contact = await getContactById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Wystąpił błąd serwera." });
  }
};

const addContactHandler = async (req, res) => {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return res.status(400).json({ message: "Missing require fields" });
  }
  return res.status(201).send(newContact);
};

const removeContactHandler = async (req, res) => {
  const removedContact = await removeContact(req.params.id);
  if (!removedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "Contact deleted" });
};

const updateContactHandler = async (req, res) => {
  const modifiedContact = await updateContact(req.params.id, req.body);
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
