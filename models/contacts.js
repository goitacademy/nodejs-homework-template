const fs = require('fs').promises;
const path = require('path');

const { serialize } = require('../utils/serialize');
const { generateId } = require('../utils/generateId');

const contactsDataPath = path.resolve(__dirname + '/contacts.json');

const listContacts = async () => {
  try {
    const contactsRaw = await fs.readFile(contactsDataPath, 'utf8');
    const parsed = serialize.parse(contactsRaw);

    return parsed;
  } catch (error) {
      console.error(error);
      return error;
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const found = contacts.find(({ id }) => id === contactId);
  
    return found; 
  } catch (error) {
    return error;
  }
}

const removeContact = async (contactId) => {
  try {
    let deletedContact = null;

    const contacts = await listContacts();
    const filtered = contacts.filter(contact => {
      const notEqual = contact.id !== contactId.toString();
  
      if(!notEqual) deletedContact = contact;
  
      return notEqual;
    });
  
    if(!deletedContact) return deletedContact;
  
    await fs.writeFile(contactsDataPath, serialize.toJSON(filtered), 'utf8');
  
    return deletedContact;
  } catch (error) {
    return error;
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = generateId(contacts);
    const newContact = { id, ...body };

    contacts.push(newContact);
    await fs.writeFile(contactsDataPath, serialize.toJSON(contacts), 'utf8');

    return newContact;
  } catch (error) {
    return error;
  }
}

const updateContact = async (contactId, body) => {
  try {
    let updatedContact = null;

    const contacts = await listContacts();
    const withUpdatedContact = await contacts.map(contact => {
      if(contact.id !== contactId) return contact;
      
        updatedContact = { id: contact.id, ...body }
        return updatedContact;
    });
  
    if(!updatedContact) return updatedContact;
  
    await fs.writeFile(contactsDataPath, serialize.toJSON(withUpdatedContact), 'utf8');
  
    return updatedContact;
  } catch (error) {
    return error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
