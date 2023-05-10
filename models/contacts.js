const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactsResult = allContacts.find(
    (contact) => contact.id === contactId
  );
  return contactsResult || null;
}

async function addContact(body) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeCotactsResult] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return removeCotactsResult;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  allContacts[index] = { contactId, ...body };

  fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
