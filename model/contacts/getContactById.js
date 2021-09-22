const getAllContacts = require("./getAllContacts");

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const contact = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );
  if (!contact) {
    return null;
  }

  return contact;
};

module.exports = getContactById;
