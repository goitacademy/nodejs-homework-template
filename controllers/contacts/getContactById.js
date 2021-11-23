const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contactList = await listContacts();

  const [contact] = contactList.filter(
    (contact) => String(contact.id) === contactId
  );
  return contact;
};

module.exports = getContactById;
