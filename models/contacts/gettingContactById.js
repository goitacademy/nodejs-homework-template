const listContacts = require('./listContacts');

const gettingContactById = async id => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(contact => contact.id === id);
  return contact;
};
module.exports = gettingContactById;
