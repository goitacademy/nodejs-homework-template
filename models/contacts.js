const fs =  require ("fs/promises");
const path = require('path')
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data) || null;
}

const getContactById = async (id) => {
  const contactId = String(id)
  const allContacts = await listContacts();
  const result =  allContacts.find(item=> item.id===contactId)
  return result || null
}

const removeContact = async (id) => {
  const contactId = String(id)
  const allContacts = await listContacts();
  const deletContact = allContacts.findIndex(item=> item.id===contactId);
  if(deletContact === -1) {
  return null}
  const result = allContacts.splice(deletContact,1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
}

const addContact = async (data) => {
  const allContacts = await listContacts();
  const nweContact = {id: nanoid(), ...data}
  allContacts.push(nweContact)
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return nweContact;
}

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const updatedContact = { ...contacts[contactIndex], ...data };
  contacts[contactIndex] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}