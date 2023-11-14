const getAll = require('./getAll');

const getById = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex(item => item.id === id);
  
  if (idx === -1) {
    return null;
  }

  return contacts[idx];

}

module.exports = getById;
