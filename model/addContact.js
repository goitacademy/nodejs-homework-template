const {v4: uuidv4} = require('uuid');
const {writeData} = require('./helpers');
const listContacts = require('./listContacts');

const addContact = async (body) => {
  const newContact = {id: uuidv4(), ...body};
  const contacts = await listContacts();

  contacts.push(newContact);

  await writeData(contacts);

  return newContact;
};

module.exports = addContact;
