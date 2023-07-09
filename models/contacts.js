const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return result;
}

async function addContact(name, email, phone) {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

async function updateById(id, data) {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { ...allContacts[index], ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
}



module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById
};