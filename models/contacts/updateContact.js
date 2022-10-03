const getListContacts = require("./getListContacts");
const overWriteList = require("./overWriteList");

const updateContact = async (contactId, body) => {
  const contacts = await getListContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) return null;
  contacts[idx] = { id: contactId, ...body };
  await overWriteList(contacts);
  return contacts[idx];
};

module.exports = updateContact;
