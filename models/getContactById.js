const getAll = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((contact) => contact.id === contactId);

  if (!result) {
    return null;
  }

  return result;
};

module.exports = getContactById;
