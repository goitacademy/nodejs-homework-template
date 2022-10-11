const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}


const getContactById = async (contactId) => {
  const parsedId = String(contactId);
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === parsedId);
  return result || null;
}

const removeContact = async (contactId) => {
  const parsedId = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex(i => i.id === parsedId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;

}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;

}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
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












