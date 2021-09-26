
const { nanoid } = require('nanoid');
const updateContactsList = require('./updateContact');

const listContacts = require('./listContacts');

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid()
  };
  const updateContacts = [...contacts, newContact];

  await updateContactsList(updateContacts);
  return newContact;
};

module.exports = addContact;
