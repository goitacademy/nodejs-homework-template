const fs = require('fs/promises')
const path = require("path");
const crypto = require('crypto')
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contact = await listContacts()
  const result = contact.find(contact => contact.id === contactId)
  return result || null
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return removedContact;
}

async function addContact(data) {
  const contact = await listContacts()
  const newContact =  { 
    id: crypto.randomUUID(),
    ...data
   }
   contact.push(newContact)
   await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
   return newContact
   
}
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  contacts[index] = {id:contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
