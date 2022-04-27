const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { contactsPath } = require("../helpers/index");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  if (!contacts) {
    return null;
  }
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = await getContactById(contactId);
  if (!deletedContact) {
    return null;
  }
  const result = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  console.log("result update", result);
  if (!result) {
    return null;
  }
  result.name = name;
  result.email = email;
  result.phone = phone;
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
