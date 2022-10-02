const getListContacts = require("./getListContacts");
const overWriteList = require("./overWriteList");

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) return null;
  const [removedContact] = contacts.splice(idx, 1);
  await overWriteList(contacts);
  return removedContact;
};

module.exports = removeContact;
