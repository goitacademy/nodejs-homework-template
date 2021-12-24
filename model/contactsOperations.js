const fs = require('fs').promises;
// const contacts = require('./contacts.json');
const path = require("path");
const { v4 } = require("uuid");


const contactsPath = path.join(__dirname, "./contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsResult = JSON.parse(data);
  return contactsResult;
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact =  allContacts.find(item =>
   item.id === String(contactId));
   return contact;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removeContactById = allContacts.filter(contact => contact.id !== String(contactId));
  console.log("removeContactById", removeContactById);
   fs.writeFile(contactsPath, JSON.stringify(removeContactById, null, 2));
   return removeContactById;
}

const addContact = async (body) => {
  const contactList = await listContacts();
  const newContact = {id: v4(), ...body};
  const newContactList = [...contactList, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2));
  return newContact; 
  
}

const updateContact = async (contactId, body) => {
  const contactList = await listContacts();
  const idx = contactList.findIndex(item => item.id === contactId);
  if (idx === -1){
    return null;
  }
  contactList[idx] = {id: String(contactId), ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return contactList[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

