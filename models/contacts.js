const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
// console.log(contactsPath);
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  // console.log(JSON.parse(data));
  return JSON.parse(data);
};

const getContactById = async ({ contactId }) => {
  const contacts = await listContacts();
  const result = await contacts.find((item) => item.id === contactId);
  // console.log(contactId);
  return result || null;
};

const removeContact = async (contactId) => {};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  // console.log(newContact);
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
