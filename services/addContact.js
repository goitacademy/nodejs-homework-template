const { nanoid } = require('nanoid');
const updateContacts = require('./updateContact');
const listContacts = require('./listContacts');

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, ...body };

  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;
