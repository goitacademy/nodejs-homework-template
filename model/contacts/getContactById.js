const readContent = require('./readContent');

const getContactById = async contactId => {
  const contacts = await readContent();
  const result = contacts.find(contact => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
