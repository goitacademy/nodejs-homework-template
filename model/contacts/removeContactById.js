const getAllContacts = require('./getAllContacts');
const updateContacts = require('./updateContacts');

const removeContactById = async contactId => {
  const contacts = await getAllContacts();
  const deletedId = contacts.findIndex(
    item => parseInt(item.id) === parseInt(contactId),
  );

  if (deletedId === -1) {
    return null;
  }
  contacts.splice(deletedId, 1);
  await updateContacts(contacts);

  return 'Contact remove';
};

module.exports = removeContactById;
