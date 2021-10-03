const getAllContacts = require('./getAllContacts');
const updateContacts = require('./updateContacts');

const updateContactById = async (contactId, data) => {
  const contacts = await getAllContacts();
  const updateId = contacts.findIndex(
    item => parseInt(item.id) === parseInt(contactId),
  );

  if (updateId === -1) {
    return null;
  }

  const updateContact = { ...contacts[updateId], ...data };
  contacts[updateId] = updateContact;

  await updateContacts(contacts);

  return updateContact;
};

module.exports = updateContactById;
