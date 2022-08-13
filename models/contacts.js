const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const getAllContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await getAllContacts();
  const newContact = { id: uuid.v1(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await getAllContacts();
  const idToUpdate = contacts.findIndex((contact) => contact.id === contactId);
  if (idToUpdate === -1) {
    return null;
  }
  const { name, email, phone } = body;
  contacts[idToUpdate] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[idToUpdate];
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
