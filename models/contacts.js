const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find((item) => item.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const removedContact = contacts.splice(contactIndex, 1);
  await updateJson(contacts);
  return removedContact;
}

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateJson(contacts);
  return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = { id:contactId, name, email, phone };
  await updateJson(contacts);
  return contacts[contactIndex];
};

const updateJson = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
