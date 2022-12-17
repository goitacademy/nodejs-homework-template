const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');
const filePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const jsonData = await fs.readFile(filePath, 'utf-8');
  const contacts = JSON.parse(jsonData);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const results = await listContacts();
  const contactIndex = results.findIndex(product => product.id === contactId);
  if (contactIndex !== -1) {
    results[contactIndex].phone = phone;
    results[contactIndex].name = name;
    results[contactIndex].email = email;
    await fs.writeFile(filePath, JSON.stringify(results, null, 3));
    return results[contactIndex];
  } else {
    return null;
  }
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return result;
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
