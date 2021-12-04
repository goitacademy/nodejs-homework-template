const listContacts = require('./getListContacts');
const updateContacts = require('./updateContacts');

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...data, id };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateById;
