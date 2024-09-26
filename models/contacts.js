
const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
    const list = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(list);
    
}

const getContactById = async (contactId) => {
  const list = await listContacts();
  return list.find(({id})=>id === contactId);
}

const removeContact = async (contactId) => {
  const list = await listContacts();
  const removeItem = await getContactById(contactId);
  const filterList = list.filter(({id})=>id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(filterList, null, 2));
  return removeItem;
}

const addContact = async (body) => {
  const list = await listContacts();
  list.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return body;
}

const updateContact = async (contactId, body) => {
  const item = await getContactById(contactId);
  const newItem = {...item, ...body};
  await removeContact(contactId);
  await addContact(newItem);
  return newItem;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
