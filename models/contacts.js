const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./contacts.json");

async function read() {
  const data = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(data);
}

function write(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
}

const listContacts = async () => {
  const data = await read();

  return data;
};

const getContactById = async (Id) => {
  const data = await read();

  return data.find((contact) => contact.id === Id);
};

const removeContact = async (contactId) => {
  const data = await read();

  const index = data.findIndex((contact) => contact.id == contactId);

  if (index === -1) {
    return null;
  }
  const newContact = [...data.slice(0, index), ...data.slice(index + 1)];

  await write(newContact);

  return data[index];
};

const addContact = async (body) => {
  const data = await read();

  const newContact = { ...body, id: crypto.randomUUID() };

  data.push(newContact);

  await write(data);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await read();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { contactId, ...body };

  await write(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
