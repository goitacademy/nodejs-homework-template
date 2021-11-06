const fs = require("fs/promises");

const getAllContacts = require("./getAllContacts");
const contactsPath = require("./contactsPath");

const deleteContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === Number(contactId) || contact.id === contactId
  );
  if (index === -1) {
    return null;
  }
  const deletedContact = contacts.splice(index, 1);

  const contactsStr = JSON.stringify(contacts);

  await fs.writeFile(contactsPath, contactsStr);
  return deletedContact;
};

module.exports = deleteContactById;
