const listContacts = require("./listContacts");
const refreshContacts = require("./refreshContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  contacts.splice(idx, 1);
  await refreshContacts(contacts);
  return true;
};

module.exports = removeContact;
