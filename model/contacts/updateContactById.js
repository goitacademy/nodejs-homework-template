const getAllContacts = require("./getAllContacts");
const updateContacts = require("./updateContacts");

const updateContactById = async (contactId, body) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(
    (contact) => String(contact.id) === String(contactId)
  );

  if (index === -1) {
    return null;
  }

  const updateContact = { ...contacts[index], ...body };
  contacts[index] = updateContact;

  await updateContacts(contacts);
  console.table(updateContact);
  return updateContact;
};

module.exports = updateContactById;
