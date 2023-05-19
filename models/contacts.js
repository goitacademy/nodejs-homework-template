const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contact = getContactById(contactId);
  if (contact) {
    let contacts = await listContacts();
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  }
  return contact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  if (contacts.some((contact) => contact.name === name)) {
    return null;
  } else {
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }
}

async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const i = contacts.findIndex((contact) => contact.id === contactId);
  if (i === -1) return null;
  const updatedContact = {
    id: contactId,
    name,
    email,
    phone,
  };
  contacts[i] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
