const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const parsedContacts = await listContacts();

  const [contactById] = parsedContacts.filter(({ id }) => id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
};

module.exports = getContactById;