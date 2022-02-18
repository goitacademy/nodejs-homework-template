const { nanoid } = require('nanoid');
const DB = require('./db');
const db = new DB('contacts.json');

const listContacts = async () => {
  return await db.read();
};

const gettingContactById = async contactId => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(contact => contact.id === contactId);
  return contact;
};

const addingContact = async body => {
  const contacts = await listContacts();
  const newContact = { ...body, id: nanoid() };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updatingContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...body, ...contacts[index] };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

const removingContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

module.exports = {
  listContacts,
  gettingContactById,
  removingContact,
  addingContact,
  updatingContact,
};
