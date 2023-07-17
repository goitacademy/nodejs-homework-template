const fs = require("fs/promises");
const path = require("node:path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  console.log(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const contact = JSON.parse(contacts).find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const contactsArray = JSON.parse(contacts);
  const index = contactsArray.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = contactsArray.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return result || null;
};

const addContact = async (id, obj) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const contactsArray = JSON.parse(contacts);
  const newContact = {
    id,
    ...obj,
  };
  console.log(newContact);
  contactsArray.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return newContact;
};

const updateContact = async (contactId, obj) => {
  const contacts = await fs.readFile(contactsPath, "utf8");
  const contactsArray = JSON.parse(contacts);
  const index = contactsArray.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const oldElement = contactsArray[index];
  const updatedContact = { ...oldElement, ...obj };
  contactsArray.splice(index, 1, updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArray, null, 2));
  return updatedContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
