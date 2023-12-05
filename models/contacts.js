const fs = require('node:fs/promises');
const path = require('node:path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'contacts.json');

async function saveDataToFile(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();

  const contact = data.find(contact => contact.id === contactId) || null;

  return contact;
}

async function removeContact(contactId) {
  const data = await listContacts();

  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const [result] = data.splice(index, 1);

  await saveDataToFile(data);

  return result;
}

async function addContact({ name, email, phone }) {
  const data = await listContacts();

  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  data.push(newContact);

  await saveDataToFile(data);

  return newContact;
}

async function updateContact(contactId, { name, email, phone }) {
  const data = await listContacts();

  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return { message: 'Not found' };
  }

  if (
    !name ||
    !email ||
    !phone ||
    name.trim() === '' ||
    email.trim() === '' ||
    phone.trim() === ''
  ) {
    return { message: 'missing fields' };
  }

  data[index] = {
    ...data[index],
    name,
    email,
    phone,
  };

  await saveDataToFile(data);

  return data[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
