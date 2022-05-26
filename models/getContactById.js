const listContacts = require('./listContacts');

const getContactById = async contactId => {
  const contcts = await listContacts();
  const result = contcts.find(item => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
