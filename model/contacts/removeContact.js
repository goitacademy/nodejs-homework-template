const path = require("path");
const readContacts = require("./readContacts");
const writeContacts = require("./writeContacts");

const contactsPath = path.join(__dirname, "./contacts.json");

const removeContact = async (contactId) => {
  const contacts = await readContacts(contactsPath);
  const requestedContactIdx = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (requestedContactIdx === -1) {
    return null;
  }

  const removedContact = contacts.splice(requestedContactIdx, 1);
  await writeContacts(contactsPath, contacts);

  return removedContact;
};

module.exports = { removeContact };
