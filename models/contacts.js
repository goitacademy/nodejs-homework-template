// const uuidv4 = require("uuid");
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
// const { writeFile } = require('fs');

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  if (!data) {
    return null;
  }

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((contact) => {
    return contact.id === contactId;
  });
  if (result === []) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const result = data.filter((contact) => {
    return contact.id !== contactId;
  });

  const deletedContact = data.find((contact) => {
    return contact.id === contactId;
  });
  if (!deletedContact) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const data = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(data);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return data;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = {
    ...body,
    id: contactId,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
