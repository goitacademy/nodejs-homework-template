const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsFilePath = require("./contactsFilePath");

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);
  if (contactIdx === -1) {
    return null;
  }

  const [deletedContact] = contacts.splice(contactIdx, 1);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts));
  return deletedContact;
};

module.exports = removeContact;
