// const fs = require('fs/promises')


const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, '../models/contacts.json');

async function updateContacts(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
    
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contactById = allContacts.find(
    (contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
}
async function removeContact(contactId) {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(idx, 1);
  updateContacts(allContacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
}

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null
  }
  allContacts[idx] = { id, ...body };
  updateContacts(allContacts);
  console.log(allContacts)
  return allContacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}