const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const db = JSON.parse(data);
  const getById = db.find((item) => item.id === contactId.toString());
  if (!getById) {
    return null;
  }

  return getById;
};

const removeContact = async (contactId) => {
  const db = await listContacts();
  const contacts = db.findIndex((item) => item.id === contactId.toString());

  if (contacts === -1) {
    return null;
  }
  const removeContact = db.splice(contacts, 1);

  fs.writeFile(contactsPath, JSON.stringify(db));
  return removeContact;
};

const addContact = async (body) => {
  const db = await listContacts();
  const item = { id: nanoid(), ...body };
  db.push(item);
  fs.writeFile(contactsPath, JSON.stringify(db));
  return item;
};

const updateContact = async (contactId, body) => {
  const db = await listContacts();
  const idx = db.findIndex((item) => item.id === contactId);
  console.log(idx);
  if (idx === -1) {
    return null;
  }

  db[idx] = { id: nanoid(), ...body };
  fs.writeFile(contactsPath, JSON.stringify(db));
  return db[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
