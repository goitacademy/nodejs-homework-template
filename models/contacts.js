const fs = require('fs/promises')
const path = require('path');
const {nanoid} = require('nanoid');

const filePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find(contact => contact.id === contactId);
  return contact || null;

}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId)
  if (index === -1) return null;

  const [result] = allContacts.splice(index,1);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2))
  return result;
}

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    ...body,
    id: nanoid(),
  }
  allContacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2))
  return newContact;

}

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const contactById = await getContactById(id);
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) return null;
  allContacts[index] = {...contactById, ...body}
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2))
  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
