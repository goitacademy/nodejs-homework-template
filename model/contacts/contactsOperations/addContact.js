const getAll = require('./getAll');
const updateContacts = require('./updateContacts');
const { v4: uuidv4 } = require('uuid');

const addContact = async(data) => {
  const contacts = await getAll();
  const newId = uuidv4();
  const newContact = { id: newId, ...data };
  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
}

module.exports = addContact;
