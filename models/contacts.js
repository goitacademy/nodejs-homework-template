const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../models/contacts.json");
//  обновление/перезапись контактов
const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === id);
  return result || null;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  const [result] = contacts.splice(index, 1);
  if (index === -1) {
    return null;
  }
  await updateContacts(contacts);
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
