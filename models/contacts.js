const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf8"));

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return (
    contacts.find((c) => c.id === contactId) || { error: "Contact not found" }
  );
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: uuidv4() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await updateContacts(updatedContacts);
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return null;
  }
  const updatedContact = { ...contacts[index], ...body, id: contactId };
  contacts[index] = updatedContact;
  await updateContacts(contacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
