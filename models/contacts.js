const fs = require('fs/promises');
const path = require('path');
const {v4: uuid} = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const contactsList = await fs.readFile(contactsPath);
    return JSON.parse(contactsList.toString());
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function getContactById(contactId) {
  const contactList = await listContacts();
  if (Array.isArray(contactList)) {
    const contact = contactList.find(item => item.id === contactId);
    return contact || null;
  }

  return null;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  if (Array.isArray(contactList)) {
    const contactToRemove = contactList.find(item => item.id === contactId);
    if (contactToRemove) {
      const contactsToKeep = contactList.filter(item => item.id !== contactToRemove.id);
      await writeFile(contactsPath, contactsToKeep);
    }

    return contactToRemove || null;
  }

  return null;
}

async function addContact(name, email, phone) {
  const contactList = await listContacts() || [];
  const contactToAdd = {
    id: uuid(),
    name,
    email,
    phone,
  };
  contactList.push(contactToAdd);
  await writeFile(contactsPath, contactList);

  return contactToAdd;
}

async function writeFile(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
