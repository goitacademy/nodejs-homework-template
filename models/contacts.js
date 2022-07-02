const fs = require("fs").promises;
const path = require("path");
const ObjId = require("bson-objectid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);

  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = await contacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: ObjId(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const { name, email, phone } = contacts[idx];
  contacts[idx] = {
    id: contactId,
    name,
    email,
    phone,
    ...body,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
