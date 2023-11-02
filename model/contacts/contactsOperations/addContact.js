const getAll = require('./getAll');
const updateContacts = require('./updateContacts')

const addContact = async(data) => {
  const contacts = await getAll();
  const newId = contacts.length + 1;
  const newContact = { id: newId, ...data };
  contacts.push(newContact);

  await updateContacts(contacts);
  return newContact;
}

module.exports = addContact;
