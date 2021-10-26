const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return await contacts.find(
    ({ id }) => id.toString() === contactId.toString()
  );
};

module.exports = getContactById;
