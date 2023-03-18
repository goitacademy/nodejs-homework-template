const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  // try {
  const result = await fs.readFile(contactsPath, 'utf8');
  const contacts = JSON.parse(result);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((person) => person.id === contactId);

  return contact;
};

const addContact = async (body) => {
  const newContact = {
    id: uuidv4(),
    ...body,
  };

  const contacts = await listContacts();

  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);

  const deletedContact = contacts[index];

  if (deletedContact !== -1) {
    contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    return deletedContact;
  } else {
    return null;
  }
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const indexContact = contacts.findIndex((person) => person.id === contactId);
  console.log('---> ~ updateContact ~ indexContact:', indexContact);

  if (indexContact !== -1) {
    contacts[indexContact].name = name;
    contacts[indexContact].email = email;
    contacts[indexContact].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[indexContact];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
