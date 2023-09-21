const fs = require('fs/promises');
const path = require('path');
const uuid = require ('uuid');

const contactsPath = path.join(__dirname, 'contacts.json')

const updateContacts = async (contactsArr) => await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2))

const listContacts = async () => {  
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)    
    return contacts;  
}

const getContactById = async (contactId) => {  
    const contactsArr = await listContacts();
    const findedContact = contactsArr.find(contact=> contact.id === contactId);
    return findedContact || null;  
}

const removeContact = async (contactId) => {  
  const contactsArr = await listContacts();  
  const index = contactsArr.findIndex(contact => contact.id === contactId);  
  if(index === -1){
    return null;
  }
  const [deleted] = contactsArr.splice(index, 1);
  await updateContacts(contactsArr);
  return deleted;
}

const addContact = async (body) => {
  const contactsArr = await listContacts();
  const newContact = {
    id: uuid.v4(),
    ...body
  }
  contactsArr.push(newContact);
  await updateContacts(contactsArr);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contactsArr = await listContacts();
  const index = contactsArr.findIndex(contact => contact.id === contactId);
  if(index === -1){
    return null;
  }
  const id = contactId
  contactsArr[index] = {id, ... body};
  await updateContacts(contactsArr);
  return contactsArr[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
