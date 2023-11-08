const fs = require('fs/promises');
const path = require("path");
const crypto = require("crypto");

const contactPath = path.join(__dirname, "contacts.json");

const updateContacts = contacts => fs.writeFile(contactPath, JSON.stringify(contacts, null, 4));

const listContacts = async () => {
  const rawJson = await fs.readFile(contactPath);
  const contacts = JSON.parse(rawJson);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
    const index = contacts.findIndex((item) => item.id === contactId);
    if (index === -1) {
        return null;
    }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1, { ...contacts[index], ...body });
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
