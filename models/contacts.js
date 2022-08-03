const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateAllContacts = async (items) => {
  await fs.writeFile(contactsPath, JSON.stringify(items, null, 2));
};

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const element = contacts.find((item) => item.id === contactId);
  if (!element) {
    return null;
  }

  return element;
}


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  await updateAllContacts(contacts);
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: ObjectID(),
    ...body,
    }
contacts.push(newContact);
  await updateAllContacts(contacts);

  return newContact;
}
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, contactId };
  updateAllContacts(contacts);

  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
