const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(`${__dirname}`, "contacts.json");

console.log(contactsPath);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const data = JSON.parse(contacts);
  return data;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const updateContact = { ...contacts[index], ...body };
  contacts[index] = updateContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
