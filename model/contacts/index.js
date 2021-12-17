const fs = require('fs/promises')
const { v4 } = require("uuid");

// const contacts = require('./contacts.json')

const contactsPath = require('../contacts/contactsPath');
const updateContacts = require('../contacts/updateContacts');


const listContacts = async () => {
  
        const contacts = await fs.readFile(contactsPath);
        const contactsList = JSON.parse(contacts);  
        return contactsList;
}

const getContactById = async (contactId) => {
  
  const contacts = await listContacts();   
  const idx = contacts.findIndex(item => item.id === contactId);
  
  if (idx === -1) {          
    return null;
  }       
  return contacts[idx];   
}

const removeContact = async (contactId) => {

        const contacts = await listContacts();        
        const idx = contacts.findIndex(item => item.id === contactId);         
        if (idx === -1) {
            return null;
        }
        const result = contacts.filter((_, index) => index !== idx);      
        
        await updateContacts(result);      
        return contacts[idx];       
}

const addContact = async (body) => {
 
  const newContact = { id: v4(), ...body };  
  const contacts = await listContacts();    
  const contactsAll = [newContact, ...contacts];  
  await updateContacts(contactsAll);   
  return newContact;   
}

const updateContact = async (contactId, body) => {

  const contacts = await listContacts();    
  const idx = contacts.findIndex(contact =>
    contact.id.toString() === contactId);         
  if (idx === -1) {
          
            return null;
  }

  contacts[idx] = { ...contacts[idx], ...body };  
  await updateContacts(contacts);  
  return contacts[idx];  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
