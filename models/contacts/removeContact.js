const getAllContacts = require("./getAllContacts");
const updateDataContacts = require("./updateDataContacts");

const removeContact = async (contactId) => {
  const allContacts = await getAllContacts();
  const idx = allContacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [deleteContacts] = allContacts.splice(idx, 1);
  await updateDataContacts(allContacts);

  return deleteContacts;
};

module.exports = removeContact;
