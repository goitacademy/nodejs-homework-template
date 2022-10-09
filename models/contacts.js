const fs = require("fs/promises");
const path = require("path");

const { uid } = require("uid");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === contactId.toString());

  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();

  const newContact = { id: uid(), ...data };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();

  const idex = contacts.findIndex((item) => item.id === contactId);

  if (idex === -1) {
    return null;
  }

  contacts[idex] = { ...contacts[idex], ...body };

  await updateContacts(contacts);

  return contacts[idex];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((item) => item.id === contactId.toString());

  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);

  await updateContacts(contacts);

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
