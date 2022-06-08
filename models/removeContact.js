const getAll = require("./listContacts");

const updateContacts = require("./updateContacts");

const removeContact = async (contactId) => {
  const contacts = await getAll();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === 1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = removeContact;
