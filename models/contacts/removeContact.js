const getAll = require("./listContacts");
const updateContacts = require("./updateContacts");

const removeContact = async (id) => {
  const contacts = await getAll();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removedContact;
};

module.exports = removeContact;
