const fs = require('fs/promises')
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    
    return JSON.parse(data)
  } catch (error) {
    console.log(error.message);
  }
}
    
const getContactById = async (contactId) => {
const contacts = await listContacts();
  const findedContact = contacts.find(({id}) => id === contactId);
   if (!findedContact) {
     return null;
   }
    console.log(findedContact);
    return findedContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({id}) => id === contactId.toString());
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name } = body;
  const isContactInList = contacts.some(contact => contact.name === name);
  if (isContactInList) {
    return console.log('This contact is in the list already');
  }
  const contact = { id: v4(), ...body };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
  return contact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === `${contactId}`);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId.toString(), ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
