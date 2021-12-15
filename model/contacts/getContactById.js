const listContacts = require('./listContacts');

const getContactById = async contactId => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if (!result) {
    return console.log('Такой ID не найден');
  }
  return result;
};

module.exports = getContactById;
