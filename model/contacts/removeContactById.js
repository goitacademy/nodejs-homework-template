const updateContacts = require('./updateContacts');
const getListContacts = require('./getListContacts');

const removeContactById = async id => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  const newListContacts = contacts.filter(contact => String(contact.id) !== id);
  await updateContacts(newListContacts);
  return contacts[idx];
};

module.exports = removeContactById;
