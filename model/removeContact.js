const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const { writeData } = require("./helpers");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removedContact = await getContactById(contactId);

  if (!removedContact) {
    return null;
  }

  const refreshedContacts = contacts.filter(
    ({ id }) => id.toString() !== contactId.toString()
  );

  await writeData(refreshedContacts);

  return removedContact;
};

module.exports = removeContact;
