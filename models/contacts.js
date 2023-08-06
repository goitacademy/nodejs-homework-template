const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath)
  return JSON.parse(allContacts);
}

const getContactById = async (id) => {
  const contactId = await listContacts();
  const getId = contactId.find(item => item.id === id)
  return getId || null;
}

const removeContact = async (id) => {
  const deleteContact = await listContacts();
  const index = deleteContact.findIndex(item => item.id === id)
  if (index === -1) {
    return null;
  }
  const [result] = deleteContact.splice(index, 1)
  await fs.writeFile(contactPath, JSON.stringify(deleteContact, null, 2))
  return result;
}

const addContact = async (body) => {
  const addContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  }
  addContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(addContacts, null, 2))
  return newContact;
}

const updateContact = async (id, body) => {
  const updateContacts = await listContacts();
  const index = updateContacts.findIndex(item => item.id === id)
  if (index === -1) {
    return null;
  }
  updateContacts [index] = {id, ...body};
  await fs.writeFile(contactPath, JSON.stringify(updateContacts, null, 2))
  return updateContacts [index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
