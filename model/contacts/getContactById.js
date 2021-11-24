const listContacts = require("./listContacts.js");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (item) => item.id.toString() === contactId.toString()
  );
  if (!contactById) {
    return null;
  }
  return contactById;
};

module.exports = getContactById;
