const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId.toString());

  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);

  return removeContact;
}

module.exports = removeContact;
