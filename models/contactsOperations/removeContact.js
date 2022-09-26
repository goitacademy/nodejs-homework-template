const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const removeContact = async (contactId) => {
  const allContacts = await listContacts();

  const idx = allContacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }
  const [result] = allContacts.splice(idx, 1);

  await updateContacts(allContacts);
  return result;
};

module.exports = removeContact;
