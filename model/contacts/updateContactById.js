const listContacts = require('./listContacts')
const updateContacts = require('./updateContacts');

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === Number(contactId));

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await updateContacts(contacts);
  return updatedContact;
};

module.exports = updateContactById;