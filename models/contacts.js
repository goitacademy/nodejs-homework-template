const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const result = await allContacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const resultContacts = await allContacts.filter(
    (contact) => contact.id !== contactId
  );
  if (resultContacts.length === allContacts.length) {
    return null;
  }
  await updateContacts(resultContacts);
  const newListOfContacts = await listContacts();
  return newListOfContacts;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const id = await ObjectID();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  await allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
