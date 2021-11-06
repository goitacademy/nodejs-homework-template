const { listContacts } = require("./getAll");
const { updateContacts } = require("./updateDB");

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const idContact = contacts.findIndex((item) => item.id === contactId);
  if (idContact === -1) {
    return null;
  }
  contacts[idContact] = { ...body, contactId };
  await updateContacts(contacts);
  return contacts[idContact];
};

module.exports = updateContactById;
