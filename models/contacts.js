const fs = require('fs/promises')
const path =  require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedLists = contacts.filter(contact => contact.id !== contactId); 
  
  await fs.writeFile(contactsPath, JSON.stringify(updatedLists)); 
  return updatedLists;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: (contacts.length + 1).toString(),
    ...body
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts(); 
  
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);

  if (contactIndex === -1) {
    return { message: 'Contact not found' };
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}


