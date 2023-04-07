const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateListContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 3));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts?.filter(
    (contact) => contact.id === contactId.toString()
  );
  if (contact.length === 0) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex(
    (item) => item.id === String(contactId)
  );
  if (indexContact === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(indexContact, 1);
  updateListContacts(contacts);
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateListContacts(contacts);
  return newContact;
}

async function updateContactById(id, { name, email, phone }) {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((item) => item.id === id);
  const newContact = {
    id,
    name,
    email,
    phone,
  };

  contacts.splice(indexContact, 1, newContact);
  updateListContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
