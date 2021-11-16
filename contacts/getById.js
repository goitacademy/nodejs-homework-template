const getAll = require('./getContacts');

const getById = async id => {
  const contacts = await getAll();
  const contact = await contacts.find(el => el.id === id);
  if (!contact) return null;

  return contact;
};

module.exports = getById;
