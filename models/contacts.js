const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");



 const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
 }

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((elem)=> elem.id === contactId);
  if(!result) {
    return null;
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const found = contacts.findIndex((elem) => elem.id === contactId);
  if(found === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(found, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = ({id: uuidv4(), name, email, phone});
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  
  const contacts = await listContacts();
  const found = contacts.findIndex((elem) => elem.id === contactId);
  if(found === -1) {
    return null;
  }
  contacts[found] = {id: contactId, name, email, phone};
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[found];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
