const getAll = require('./getContacts');
const updateContacts = require('./updateContacts');

const putById = async (id, data) => {
  const contacts = await getAll();
  const idx = contacts.findIndex(el => el.id === id);

  if (!contacts[idx]) return null;

  contacts[idx] = { ...data, id };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = putById;
