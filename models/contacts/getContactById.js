const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
