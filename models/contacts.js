const path = require('path');
const { nanoid } = require("nanoid");
const { readFile, writeFile } = require('fs').promises;

const contactsPath = path.join(__dirname, "./data/contacts.json");


const listContacts = async () => {
  const ReadResult = await readFile(contactsPath)

  return JSON.parse(ReadResult)
}

const getContactById = async (contactId) => {
  const all = await listContacts()
  const searcedContact = await all.find(item => item.id === contactId)

  return searcedContact || null
}

const removeContact = async (contactId) => {
  const all = await listContacts();
  const index = await all.findIndex(item => item.id === contactId);
  console.log(index);

  if (index === -1) { return null };

  const [result] = all.splice(index, 1);
  await writeFile(contactsPath, JSON.stringify(all, null, 2));

  return result;
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  console.log(newContact);
  allContacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) { return null }

  allContacts[index] = { contactId, ...body };
  await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
