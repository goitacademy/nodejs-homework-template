const { nanoid } = require('nanoid');
const updateContacts = require('./updateContact');
const listContacts = require('./listContacts');

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, ...name, ...email, ...phone };

  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;
