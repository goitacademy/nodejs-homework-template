const nanoId = require('nanoid').customAlphabet('1234567890', 4);

const getAllContacts = require('./getAllContacts');
const updateContacts = require('./updateContacts');

const addContact = async data => {
  const contacts = await getAllContacts();
  const newContact = { ...data, id: nanoId() };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

module.exports = addContact;
