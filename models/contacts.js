const fs = require("fs/promises");
const { resolve } = require("path");
const { v4: uuidv4 } = require("uuid");

const contactPath = resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = contacts.find((item) => item.id === contactId);
  if (removedContact) {
    const newContacts = contacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactPath, JSON.stringify(newContacts, null, 2));
    return removedContact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const addedContact = { ...body, id: uuidv4() };
  contacts.push(addedContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return addedContact;
};
// addContact({ name: "Ira Burlaka", email: "a@b.c", phone: "(704) 398-7993" });

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const updatedContact = contacts.find((item) => item.id === contactId);
  const contactsWithoutUpdated = contacts.filter((item) => item.id !== contactId);
  const updateBody = { ...updatedContact, ...body };
  contactsWithoutUpdated.push(updateBody);
  await fs.writeFile(contactPath, JSON.stringify(contactsWithoutUpdated, null, 2));
};
//updateContact("e6ywwRe4jcqxXfCZOj_1e", { name: "Thomas van Lucas" });

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
