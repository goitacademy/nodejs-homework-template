const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const oneContact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!oneContact) return null;
  return oneContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (idx === -1) return null;
  const [deletedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return deletedContact;
}

async function addContact(body) {
  const contacts = await listContacts();
  const newContact = {
    ...body,
    id: uuidv4(),
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = {
    ...contacts[idx],
    ...body,
    id: contactId,
  };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
