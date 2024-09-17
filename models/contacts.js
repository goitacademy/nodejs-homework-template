const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf-8"));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((с) => с.id === contactId);
  return result || null;
};


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((с) => с.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};


const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};


const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((с) => с.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {  ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
