const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateById = async (contactId, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (!~idx) {
    return null;
  }
  contacts[idx] = {
    id: contactId,
    ...data,
  };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = updateById