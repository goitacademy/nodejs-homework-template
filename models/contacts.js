const { readFile, writeFile } = require("fs/promises");
const { nanoid } = require("nanoid");

const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const id = String(contactId);

  const data = await listContacts();
  const contactbyId = data.find((contact) => contact.id === id);

  return contactbyId;
};

const removeContact = async (contactId) => {
  const id = String(contactId);

  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  data.splice(index, 1);

  await writeFile(contactsPath, JSON.stringify(data, null, 2));

  return { message: "contact deleted" };
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };

  contacts.push(newContact);

  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);

  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }
  data[index] = { id, ...body };
  await writeFile(contactsPath, JSON.stringify(data, null, 2));

  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
