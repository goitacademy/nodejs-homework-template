const getAllContacts = require("./getAllContacts");
const updateContacts = require("./updateContacts");

const removeContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (idx === -1) {
    return null;
  }

  const removeContact = contacts[idx];

  contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
};

module.exports = removeContactById;
