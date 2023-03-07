const fs = require("fs/promises");
const path = require("path");
const db = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const dataRaw = await fs.readFile(db);
  return JSON.parse(dataRaw);
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  await fs.writeFile(
    db,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId))
  );
  return contactById || null;
};

const addContact = async (body) => {
  const contacts = await readContacts();
  contacts.push(body);
  await fs.writeFile(db, JSON.stringify(contacts));
  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);

  const changeContact = { ...contactById, ...body };
  const idxContact = contacts.findIndex((contact) => contact.id === contactId);
  contacts.splice(idxContact, 1, changeContact);
  await fs.writeFile(db, JSON.stringify(contacts));
  return changeContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
