const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.filter((contact) => contact.id === String(contactId));
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.filter((contact) => contact.id === contactId);
  const newContacts = contacts.filter(
    (contact) => contact.id !== String(contactId)
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf8");
  return deletedContact;
};

const updateContact = async (contactId, body) => {
  const oldContact = await removeContact(contactId);

  if (oldContact.length !== 0) {
    return await addContact(body);
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
