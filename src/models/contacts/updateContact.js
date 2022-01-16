const fs = require("fs/promises");
const listContacts = require("./listContacts");
const contactsFilePath = require("./contactsFilePath");

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex(({ id }) => id === contactId);

  if (contactIdx === -1) {
    return null;
  }

  contacts[contactIdx] = {
    id: contactId,
    ...body,
  };

  await fs.writeFile(contactsFilePath, JSON.stringify(contacts));

  return contacts[contactIdx];
};

module.exports = updateContact;
