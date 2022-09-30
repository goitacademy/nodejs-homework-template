const listContacts = require("./listContacts");
const rewriteJson = require("./rewriteJson");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await rewriteJson(contacts);

  return contacts[index];
};

module.exports = updateContact;
