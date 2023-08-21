const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, 'contacts.json');

async function readFile() {
  const data = await fs.readFile(contactsPath, 'utf8');

  return JSON.parse(data);
};

function writeFile(data) {
  return fs.writeFile(contactsPath, JSON.stringify(data));
};

async function listContacts() {
  const data = await readFile();

  return data;
};

async function getContactById(contactId) {
  const data = await readFile();
  const contactById = data.find(contact => contact.id === contactId);

  return contactById || null;
};

async function addContact(contact) {
  const data = await readFile();
  const newContact = {
    id: crypto.randomUUID().toString(),
    ...contact
  };

  data.push(newContact);
  await writeFile(data);

  return newContact;
};

const updateContact = async (contactId, {name, email, phone}) => {
  const data = await readFile();
  const index = data.findIndex(contact => contact.id === contactId);
  console.log(index);
  if (index === -1) {
    return null;
  };

  data[index] = { id: contactId, name, email, phone };
  await writeFile(data);

  return data[index];
};

async function removeContact(contactId) {
  const data = await readFile();
  const index = data.findIndex(contact => contact.id === contactId);

  if (index === -1) {
    return null;
  };

  const [result] = data.splice(index, 1);
  await writeFile(data);

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
}
