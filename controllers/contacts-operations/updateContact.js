const listContacts = require("./listContacts");
const refreshContacts = require("./refreshContacts");

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => String(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], name, email, phone };
  await refreshContacts(contacts);
  return contacts[idx];
};

module.exports = updateContact;
