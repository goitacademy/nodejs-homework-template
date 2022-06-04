const { v4 } = require('uuid');

const contactPathUpdate = require('./contactsPathUpdate');
const listContacts = require('./listContacts');

async function addContact({ name, email, phone }) {
  const dataContactsGetAll = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  dataContactsGetAll.push(newContact);
  await contactPathUpdate(dataContactsGetAll);
  return newContact;
}
module.exports = addContact;
