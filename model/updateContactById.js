/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable quotes */
const listContacts = require("./listContacts");
const updateListContacts = require("./updateListContacts");

// updateContactById - добавить контакт.
const updateContactById = async (contactId, bodyContact) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(
    (contact) => String(contact.id) === contactId
  );
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id: contactId, ...bodyContact };
  await updateListContacts(allContacts);
  return allContacts[idx];
};

module.exports = updateContactById;
