const fs = require("fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);

  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();

  const index = data.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const newContacts = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newContacts);

  return newContacts;
};

const addContact = async (body) => {
  const data = await listContacts();
  const { name, email, phone } = body;
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  write(data);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const { name, email, phone } = body;
  const contact = allContacts.find((contact) => contact.id === contactId);

  contact.name = name;
  contact.email = email;
  contact.phone = phone;

  return contact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
