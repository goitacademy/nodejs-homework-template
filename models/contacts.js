const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, 'utf-8');
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  const deletedContact = contacts[index];

  if (deletedContact !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return deletedContact || null;
};

const addContact = async body => {
  const { name, email, phone } = body;

  const newContact = {
    id: uuid.v4(),
    name,
    email,
    phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(({ id }) => id === contactId);

  if (contactIndex !== -1) {
    contacts[contactIndex].name = name;
    contacts[contactIndex].email = email;
    contacts[contactIndex].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
