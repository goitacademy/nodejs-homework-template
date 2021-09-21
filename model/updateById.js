const updateContacts = require('./updateContact');
const listContacts = require('./listContacts');

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === Number(id));
  if (idx === -1) {
    return null;
  }
  const updateContact = { ...contacts[idx], ...data };
  contacts[idx] = updateContact;
  await updateContacts(contacts);
  return updateContact;
};

module.exports = updateById;
