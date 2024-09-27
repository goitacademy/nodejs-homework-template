// const fs = require('fs/promises')
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, '/contacts.json');

const updateContacts = async (contacts) => {
  const data = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, data);
}

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (body) => {
  const {name, email, phone} = body
  const contacts = await listContacts();
  const newContact = { 
    id: crypto.randomUUID(), 
    name,
    email, 
    phone, 
  };
  contacts.push(newContact);
  await updateContacts(contacts)
  return newContact;
}

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  result.name = name;
  result.email = email;
  result.phone = phone;
  await updateContacts(contacts)
  return result
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1){
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts)
  return removeContact
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};