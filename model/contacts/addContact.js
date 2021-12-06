const { v4 } = require('uuid');
const updateContacts = require('./updateContacts');
const getListContacts = require('./getListContacts');

const addContact = async data => {
  const contactsList = await getListContacts();
  const newContact = { id: v4(), ...data };
  contactsList.push(newContact);
  await updateContacts(contactsList);
  return newContact;
};

module.exports = addContact;
