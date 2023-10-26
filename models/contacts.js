 const fs = require('fs/promises')
 const path = require('path');
const { stringify } = require('querystring');
const contactsPath = path.join(__dirname, './contacts.json');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
 
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
 
  }


const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(cont => cont.id === contactId);
  return contact||null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(cont => cont.id === contactId);
  if(index === -1){
    return null;
  }

  const removedContact = contacts[index];

  fs.writeFile(contactsPath, stringify.JSON(contacts, null, 2))
  return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {id:uuidv4, ...body};
  contacts.push(newContact);

  fs.writeFile(contactsPath, stringify.JSON(contacts, null, 2))
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(cont => cont.id ===contactId);
  if(index === -1){
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
