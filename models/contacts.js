const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  return list;
};

const getContactById = async (contactId) => {
  const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = list.find(({ id }) => id === contactId);
  console.log(contact);
  return contact;
};

const removeContact = async (contactId) => {
  const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = list.find(({ id }) => id === contactId);
  if (!contact) {
    return;
  }
  const newList = JSON.stringify(list.filter(({ id }) => id !== contactId));

  await fs.writeFile(contactsPath, newList);
  return newList;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const newList = JSON.stringify([...list, newContact]);
  await fs.writeFile(contactsPath, newList);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const list = JSON.parse(await fs.readFile(contactsPath, "utf-8"));
  const contact = list.find(({ id }) => id === contactId);
  const index = list.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return;
  }
  const updateContact = { ...contact, ...body };
  list.splice(index, 1, updateContact);
  await fs.writeFile(contactsPath, JSON.stringify(list), "utf-8");

  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
