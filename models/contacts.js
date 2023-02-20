const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const data = await listContacts();
  const contact = data.find(el => el.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const data = await listContacts();
  const index = data.findIndex(el => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = data.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return result;
};

const addContact = async body => {
  const data = await listContacts();
  data.push(body);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return body;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex(el => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = { ...data[index], ...body };
  data.splice(index, 1, result);
  fs.writeFile(contactsPath, JSON.stringify(data));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
