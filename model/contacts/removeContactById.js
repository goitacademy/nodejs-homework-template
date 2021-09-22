const getAllContacts = require("./getAllContacts");
const updateContacts = require("./updateContacts");

const removeContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );
  if (index === -1) {
    return null;
  }
  const removeContact = contacts[index];

  contacts.splice(index, 1);
  await updateContacts(contacts);
  console.table(removeContact);
  return removeContact;
};

module.exports = removeContactById;
