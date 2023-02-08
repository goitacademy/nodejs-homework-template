const getAllContacts = require("./getAllContacts");

const getContactById = async (contactId) => {
  const allContacts = await getAllContacts();
  const contactById = allContacts.find((contact) => contact.id === contactId);

  if (!contactById) {
    return null;
  }

  return contactById;
};

module.exports = getContactById;
