const fs = require("fs/promises");
const path = require("path");
const contacts = require("./contacts.json");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, contacts);

const update = async (items) => {
  const itemsString = JSON.stringify(items);
  await fs.writeFile(contactsPath, itemsString);
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return (contacts = JSON.parse(data));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.filter((item) => item.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    throw new Error(`Contacts with id=${contactId} not found`);
  }
  const restContacts = contacts.filter((item) => item.id !== contactId);
  await update(restContacts);
  return contacts[index];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: uuidv4() };
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactToUpdate = contacts.filter((item) => item.id === contactId);
  const updatedContact = { ...contactToUpdate, ...body };
  await update({ ...contacts, ...updatedContact });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
