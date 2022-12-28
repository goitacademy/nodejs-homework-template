const path = require("path");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  const dataRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
  const data = JSON.parse(dataRaw);
  return data;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find((contact) => contact.id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const db = await listContacts();
  const newDb = db.filter((contact) => contact.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newDb));
};

const addContact = async (body) => {
  const id = uuidv4();
  const contact = { id, ...body };
  const db = await listContacts();
  db.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(db));
  const data = await listContacts();
  return data;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const idx = data.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data));
  return data[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
