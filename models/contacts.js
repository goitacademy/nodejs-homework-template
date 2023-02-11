const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const parsedData = await listContacts();

  const contact = parsedData.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const parsedData = await listContacts();

  const index = parsedData.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return false;
  }

  const newList = parsedData.filter((contact) => contact.id !== contactId);

  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 4));

  return true;
};

const addContact = async (body) => {
  const parsedData = await listContacts();
  const { name, email, phone } = body;
  const newContact = { id: uuidv4(), name, email, phone };
  parsedData.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 4));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const parsedData = await listContacts();

  const index = parsedData.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return false;
  }

  parsedData[index] = {
    ...parsedData[index],
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(parsedData, null, 4));
  return parsedData[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
