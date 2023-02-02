const getAll = require('./getAll');

const getById = async id => {
  const contacts = await getAll();
  const contact = contacts.find(el => el.id === id);
  return contact;
};

module.exports = getById;
