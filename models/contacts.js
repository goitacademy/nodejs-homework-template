const fs = require('fs/promises')
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");




const listContacts = async () => {
  const data = await fs.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (id) => {
   const data = await listContacts();
  const getContacts = data.find((contacts) => contacts.id === id);
  return getContacts || null;
}

const removeContact = async (id) => {
  const data = await listContacts();
  const remove = data.filter((contact) => contact.id !== id);
  await fs.writeFile(`${contactsPath}`, JSON.stringify(remove, null, 2));
  return remove || null;
}

const addContact = async (contact) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contact,
  };
  data.push(newContact);
  await fs.writeFile(`${contactsPath}`, JSON.stringify(data, null, 2));
  return newContact;
}

const updateContact = async (id, data) => {
   const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(`${contactsPath}`, JSON.stringify(contacts, null, 2));
 
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
