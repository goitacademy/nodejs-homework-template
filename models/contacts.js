const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const getContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  console.log(contacts);
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    throw new Error('Not found');
  }
  return result;
};

const addContact = async (body) => {
  const contacts = await getContacts();

  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return body;
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  console.log(index);
  if (index === -1) {
    throw new Error('Not found');
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    throw new Error('Not found');
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  console.log(body);
  console.log(updatedContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
