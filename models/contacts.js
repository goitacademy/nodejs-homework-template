const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsList = JSON.parse(data);

  return contactsList;
}

const getContactById = async (id) => {
  const contactsList = await listContacts();
  const searchedContact = contactsList.find(contact => contact.id === id.toString());
  
  if (!searchedContact) {
      return null;
  }

  return searchedContact;
}

const removeContact = async (id) => {
  const contactsList = await listContacts();
  const indexOfContact = contactsList.findIndex(contact => contact.id === id);
  
  if (indexOfContact === -1) {
    return null
  }

  console.log("Removing contact:");
  console.table(contactsList[indexOfContact]);

  contactsList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  
  return contactsList;
}

const addContact = async ({name, email, phone}) => {
  const contactsList = await listContacts();
  const newContact = {id: v4(), name, email, phone };
  
  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  
  return contactsList;
}

const updateContact = async (id, body) => {
  const contactsList = await listContacts();
  const indexOfContact = contactsList.findIndex(contact => contact.id === id.toString());
  if (indexOfContact === -1) {
    return null;
  }

  contactsList[indexOfContact] = { id, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[indexOfContact];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
