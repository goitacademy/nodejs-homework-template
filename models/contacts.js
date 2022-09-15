const fs = require('fs').promises;
const path = require('path');

const { serialize } = require('../utils/serialize');
const { generateId } = require('../utils/generateId');
const { errorHandlerAsync } = require('../utils/errorHandler');
const { wrapperFactory } = require('../utils/wrapperFactory');

const contactsDataPath = path.resolve(__dirname + '/contacts.json');

const listContacts = async () => {
    const contactsRaw = await fs.readFile(contactsDataPath, 'utf8');
    const parsed = serialize.parse(contactsRaw);

    return parsed;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const found = contacts.find(({ id }) => id === contactId);
  
    return found; 
}

const removeContact = async (contactId) => {
    let deletedContact;

    const contacts = await listContacts();
    const filtered = contacts.filter(contact => {
      const notEqual = contact.id !== contactId.toString();
  
      if(!notEqual) deletedContact = contact;
  
      return notEqual;
    });
  
    if(!deletedContact) return null;
  
    await fs.writeFile(contactsDataPath, serialize.toJSON(filtered), 'utf8');
  
    return deletedContact;
}

const addContact = async (body) => {
    const contacts = await listContacts();
    const id = generateId(contacts);
    const newContact = { id, ...body };

    contacts.push(newContact);
    await fs.writeFile(contactsDataPath, serialize.toJSON(contacts), 'utf8');

    return newContact;
}

const updateContact = async (contactId, body) => {
    let updatedContact;

    const contacts = await listContacts();
    const withUpdatedContact = await contacts.map(contact => {
      if(contact.id !== contactId) return contact;
      
        updatedContact = { id: contact.id, ...body }
        return updatedContact;
    });
  
    if(!updatedContact) return null;
  
    await fs.writeFile(contactsDataPath, serialize.toJSON(withUpdatedContact), 'utf8');
  
    return updatedContact;
}

module.exports = {
  ...wrapperFactory(
    errorHandlerAsync,
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
  )  
}