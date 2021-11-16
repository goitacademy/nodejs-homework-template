const getContacts = require('./getContacts');
const updateContacts = require('./updateContacts');

const deleteById = async id => {
  const contacts = await getContacts();

  console.log('-0-', contacts);
  const idx = contacts.findIndex(el => el.id === id);

  if (idx === -1) return null;
  const removedContact = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removedContact;
};

module.exports = deleteById;
