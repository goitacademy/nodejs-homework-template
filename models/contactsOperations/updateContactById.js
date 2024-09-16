const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const updateContactById = async (contactId, body) => {
  const allContacts = await listContacts();

  const updateContact = {
    id: contactId,
    ...body,
  };

  const idx = allContacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) {
    return null;
  }

  allContacts[idx] = updateContact;
  await updateContacts(allContacts);
  return updateContact;
};

module.exports = updateContactById;
