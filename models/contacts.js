const fs = require('fs').promises;
const {nanoid} = require('nanoid')
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateContactList = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts));

const listContacts = async () => {
  try {
    const contactsString = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(contactsString);
    return contacts;
  }
  catch (err){
    console.error('Error:', err);
  }    
}

const getContactById = async (contactId) => {
  const id = String(contactId);
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find(contact => contact.id === id);
    return contactById || null; 
  }
  catch (err) {
    console.error('Error:', err);
  }    
}

const removeContact = async (contactId) => {
  const id = String(contactId);
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    const deletedContact = allContacts[index];
    if (index !== -1) {
      allContacts.splice(index, 1);
      updateContactList(allContacts);
    }
    return deletedContact || null;
  }
  catch (err) {
    console.error('Error:', err);
  }    
}

const addContact = async (body) => {
  const newContact = {
    id: nanoid(),
    ...body
  }
  try {
    const allContacts = await listContacts();
    allContacts.push(newContact);
    updateContactList(allContacts);
    return newContact;
  }
  catch (err) {
    console.error('Error:', err);
  }      
}

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  try {
    const allContacts = await listContacts();
    const index = allContacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      allContacts[index] = { id, ...body };
      updateContactList(allContacts);
    }
    return allContacts[index] || null
  }
  catch (err){
    console.error('Error:', err);
  }
 

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}