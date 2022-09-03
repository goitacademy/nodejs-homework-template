const listContacts = require('./listContacts');
const updateContacts = require('./helpers/updateContacts');

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContactId = String(+[...contacts].sort((a, b) => b.id - a.id)[0].id + 1);
  const newContact = { id: newContactId, name, email, phone };

  contacts.push(newContact)
  await updateContacts(contacts);

  return newContact;
}

module.exports = addContact