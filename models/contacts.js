const fs = require('fs/promises')
const path = require("path");
const contactsPath = path.join(__dirname, "/contacts.json");
const {nanoid} = require("nanoid");


const updateFile = async(newList) => {
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
  }


const listContacts = async () => {
  const list = await fs.readFile(contactsPath);
  return JSON.parse(list);
}

const getContactById = async(contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find(contact => contact.id === contactId);
  if(!contact){
      return null;
  }
  return contact;
}

const removeContact = async(contactId) => {
  const contactList = await listContacts();
  const idx = contactList.findIndex(item => item.id === contactId)
if(idx === -1){
  return null
}
const [removeContact] = contactList.splice(idx, 1);
updateFile(contactList);
return removeContact;
}

const addContact = async({name, email, phone}) => {
  const contactList = await listContacts();
  const newContact = {
      id: nanoid(),
      name, 
      email,
      phone
  }
  contactList.push(newContact);
  updateFile(contactList);
  return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId)
if(idx === -1){
  return null
}
  contacts[idx] = {contactId, name, email, phone};
  await updateFile(contacts);
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
