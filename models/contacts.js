const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const filePath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

async function listContacts() {
  const data = await fs.readFile(filePath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContacts(newContacts);

  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };

  await updateContacts([...contacts, newContact]);

  return newContact;
}

async function updateContact(id, name, email, phone) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };

  await updateContacts(contacts);

  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
