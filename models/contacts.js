const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');
const ObjectId = require("bson-objectid");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const res = await contacts.find(({ id }) => id === contactId.toString());
    if (!res) return null;
    return res;
  } catch (e) {
    console.log(e.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.filter(({ id }) => id !== contactId.toString());
    fs.writeFile(contactsPath, JSON.stringify(idx, null, '/t'));
    return idx;
  } catch (e) {
    console.error(e.message);
  }
}

const addContact = async (name, phone, email) => {
  try {
    const contacts = await listContacts();
    const newContact = [...contacts, { id: ObjectId(), name, email, phone }];

    const contactsList = JSON.stringify(newContact, null, '/t');
    await fs.writeFile(contactsPath, contactsList, 'utf-8');
  } catch (e) {
    console.log(e.message);
  }
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, contactId };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, '/t'));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
