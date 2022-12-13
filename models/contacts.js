const uniqid = require('uniqid');
const fs = require('fs').promises;
const path = require('path');
require('colors');

const contactsPath = path.join(__dirname, './contacts.json');

// Create methods for contacts
// Get array with contacts (For dev usage)
async function getContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contactsList = JSON.parse(data);
  return contactsList;
}

// Show all list contacts
async function listContacts() {
  const contactsList = await getContacts();
  return contactsList;
}

// Show contact by ID
async function getContactById(contactId) {
  console.log(contactId);
  const contactsList = await getContacts();
  const contactById = contactsList.find(contact => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
}

// Remove contact by ID
async function removeContact(contactId) {
  const contactsList = await getContacts();

  const sortedContacts = contactsList.filter(
    contact => contact.id !== contactId
  );

  if (sortedContacts.length === contactsList.length) {
    return null;
  } else {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(sortedContacts, null, 2),
      'utf-8'
    );
    return contactId;
  }
}

// Add contact
async function addContact(name, email, phone) {
  const contactsList = await getContacts();

  const contactForAdd = {
    id: uniqid(),
    name,
    email,
    phone,
  };

  const newContacts = [...contactsList, contactForAdd];

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf-8'
  );

  return contactForAdd;
}

const updateContact = async (contactId, body) => {
  const contactsList = await getContacts();

  const newContacts = contactsList.map(item => {
    if (item.id === contactId) {
      return body;
    } else {
      return item;
    }
  });

  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    'utf-8'
  );
  console.log(`We successfully updated contact!`.bgGreen);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
