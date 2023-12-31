const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await readContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Contact not found");
    return null;
  }

  const removedContact = contacts[index];

  contacts.splice(index, 1);

  await writeContacts(contacts);

  // console.log("Contact removed:", removedContact);

  return removedContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await readContacts();

  const newContact = {
    name: name,
    email: email,
    phone: phone,
    id: crypto.randomUUID(),
  };

  contacts.push(newContact);

  await writeContacts(contacts);

  return newContact;
}

async function updateContact(contactId, updateContactData) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("contact not found");
    return null;
  }

  const updatedContact = {
    ...contacts[index],
    ...updateContactData,
    id: contactId,
  };
  contacts[index] = updatedContact;

  await writeContacts(contacts);

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
