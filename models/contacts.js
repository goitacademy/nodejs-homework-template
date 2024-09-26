const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const contacts = require("./contacts.json");
console.log(contacts);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  console.log(contacts);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const findContactById = contacts.find(({ id }) => id === contactId);

  return findContactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findContactById = contacts.find(({ id }) => id === contactId);
  const index = contacts.indexOf(findContactById);
  const newContacts = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
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

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
