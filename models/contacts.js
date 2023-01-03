const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");


async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = await contacts.find(({ id }) => id === contactId);
  if (!result) return null;
  return result;
}
async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if(idx === -1) return null;
  contacts[idx] = {
    contactId, ... body
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}