const { v4 } = require("uuid");

const listContacts = require('./listContacts');
const updateContacts = require('./updateContacts');

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {...body, id: v4()}
  await updateContacts([...contacts, newContact])
  return newContact
}

module.exports = addContact;