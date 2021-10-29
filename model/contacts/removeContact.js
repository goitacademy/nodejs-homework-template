const fs = require("fs/promises");
const readContact = require("./readContact");
const contactsPath = require("./contactsPath");
const updateContacts = require("./updateContacts");

const removeContact = async (contactId) => {
  const contacts = await readContact();
  const idx = contacts.findIndex(({ id }) => Number(id) === Number(contactId));
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter(
    ({ id }) => Number(id) !== Number(contactId)
  );
  await updateContacts(newContacts);
  console.table(newContacts);
  return contacts[idx];
};

module.exports = removeContact;
